import { reactive, ref, computed, watchEffect } from "vue";
import { Tool } from "@/interfaces";
import { queryConfig } from "@/services";

type ToolStore = {
  updateTime: number;
  tools: Tool[];
};

function getLocalConfig() {
  const result: ToolStore = {
    updateTime: 0,
    tools: [],
  };
  const updateTime = localStorage.getItem("updateTime");
  if (updateTime !== null) {
    result.updateTime = parseInt(updateTime, 10);
  }
  const tools = localStorage.getItem("tools");
  if (tools !== null) {
    result.tools = JSON.parse(tools);
  }
  return result;
}

export const localTools = reactive<ToolStore>(getLocalConfig());

export const remoteTools = ref<ToolStore | null>(null);

export const tagsSet = computed(() => {
  const set = new Set<string>();
  for (const tool of localTools.tools) {
    for (const tag of tool.tags) {
      set.add(tag);
    }
  }
  return set;
});

watchEffect(() => {
  if (remoteTools.value) {
    if (remoteTools.value.updateTime > localTools.updateTime) {
      localTools.updateTime = remoteTools.value.updateTime;
      localTools.tools = remoteTools.value.tools;
      localStorage.setItem("updateTime", `${remoteTools.value.updateTime}`);
      localStorage.setItem("tools", JSON.stringify(remoteTools.value.tools));
    }
  }
});

export async function getRemoteConfig() {
  const result = await queryConfig();
  if (result.success) {
    remoteTools.value = result.data;
  }
  return result;
}
