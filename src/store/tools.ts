import { reactive, ref, computed, watch, watchEffect } from "vue";
import { Tool } from "@/interfaces";
import { queryConfig } from "@/services";
import { Constant, StorageKey } from "../interfaces/constant";

type ToolStore = {
  updateTime: number;
  tools: Tool[];
};

function getLocalConfig(): ToolStore {
  const config: ToolStore = {
    updateTime: 0,
    tools: [],
  };
  const updateTimeStorage = localStorage.getItem("updateTime");
  if (updateTimeStorage !== null) {
    config.updateTime = parseInt(updateTimeStorage);
  }
  for (let i = 0; i < localStorage.length; i++) {
    const storageKey = localStorage.key(i)!;
    if (storageKey.startsWith(StorageKey.ConfigPrefix)) {
      const toolStorage = localStorage.getItem(storageKey)!;
      const id = storageKey.slice(StorageKey.ConfigPrefix.length);
      config.tools.push({ _id: id, ...JSON.parse(toolStorage) });
    }
  }
  return config;
}

export const localConfig = reactive<ToolStore>(getLocalConfig());

watchEffect(() => {
  localStorage.setItem(StorageKey.UpdateTime, `${localConfig.updateTime}`);
});

export const remoteConfig = ref<ToolStore | null>(null);

export const tagsSet = computed(() => {
  const set = new Set<string>();
  for (const tool of localConfig.tools) {
    for (const tag of tool.tags) {
      set.add(tag);
    }
  }
  return set;
});

const idsSet = computed(() => {
  const set = new Set<number>();
  for (const tool of localConfig.tools) {
    set.add(parseInt(tool._id, Constant.IdRadix));
  }
  return set;
});

let safeId = 0;

watchEffect(() => {
  while (idsSet.value.has(safeId)) {
    safeId++;
  }
});

export async function getRemoteConfig() {
  const result = await queryConfig();
  if (result.success) {
    remoteConfig.value = result.data;
    if (remoteConfig.value.updateTime > localConfig.updateTime) {
      localConfig.updateTime = remoteConfig.value.updateTime;
      localConfig.tools = remoteConfig.value.tools;
      for (const tool of localConfig.tools) {
        const { _id, ...content } = tool;
        localStorage.setItem(
          `${StorageKey.ConfigPrefix}${tool._id}`,
          JSON.stringify(content),
        );
      }
    }
  }
  return result;
}

export function deleteTool(id: string) {
  const index = localConfig.tools.findIndex((tool) => tool._id === id);
  if (index >= 0) {
    localConfig.updateTime = Date.now();
    localConfig.tools.splice(index, 1);
    localStorage.removeItem(`${StorageKey.ConfigPrefix}${id}`);
  }
}

export function updateTool<T extends Partial<Tool> & { _id: "string" }>(
  tool: T,
) {
  const targetTool = localConfig.tools.find(({ _id }) => _id === tool._id);
  if (targetTool) {
    localConfig.updateTime = Date.now();
    for (const key in tool) {
      // @ts-ignore
      targetTool[key] = tool[key];
    }
    const { _id, ...content } = tool;
    localStorage.setItem(
      `${StorageKey.ConfigPrefix}${tool._id}`,
      JSON.stringify(content),
    );
  }
}

export function insertTool(tool: Omit<Tool, "_id">) {
  localConfig.updateTime = Date.now();
  const id = safeId.toString(Constant.IdRadix);
  localConfig.tools.push({ _id: id, ...tool });
  localStorage.setItem(`${StorageKey.ConfigPrefix}${id}`, JSON.stringify(tool));
}
