import { reactive, ref, watch } from "vue";
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

watch([remoteTools, localTools], ([nowRemote, nowLocal]) => {
  if (nowRemote) {
    if (nowRemote.updateTime > nowLocal.updateTime) {
      localTools.updateTime = nowRemote.updateTime;
      localTools.tools = nowRemote.tools;
      localStorage.setItem("updateTime", `${nowRemote.updateTime}`);
      localStorage.setItem("tools", JSON.stringify(nowRemote.tools));
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
