import { ref, computed, watchEffect } from "vue";
import { RemoteTool, StorageTool, StoreTool } from "@/interfaces";
import { queryConfig } from "@/services";
import { Constant, StorageKey } from "../interfaces/constant";

function getUpdateTime() {
  const updateTime = localStorage.getItem(StorageKey.UpdateTime);
  if (updateTime !== null) {
    return parseInt(updateTime, Constant.Radix);
  } else {
    return 0;
  }
}

export const updateTime = ref(getUpdateTime());

watchEffect(() => {
  localStorage.setItem(
    StorageKey.UpdateTime,
    updateTime.value.toString(Constant.Radix),
  );
});

function getLocalTools() {
  const tools: StoreTool[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const storageKey = localStorage.key(i)!;
    if (storageKey.startsWith(StorageKey.ConfigPrefix)) {
      const toolStorage = localStorage.getItem(storageKey)!;
      const id = storageKey.slice(StorageKey.ConfigPrefix.length);
      const storageTool = JSON.parse(toolStorage) as StorageTool;
      const { tags, ...rest } = storageTool;
      tools.push({ ...rest, _id: id, tags: tags.split(",") });
    }
  }
  return tools;
}

export const tools = ref<StoreTool[]>(getLocalTools());

export const toolMap = computed(() => {
  const map = new Map<string, StoreTool>();
  for (const tool of tools.value) {
    map.set(tool._id, tool);
  }
});

export const tagsSet = computed(() => {
  const set = new Set<string>();
  for (const tool of tools.value) {
    for (const tag of tool.tags) {
      set.add(tag);
    }
  }
  return set;
});

const remoteTools = ref<RemoteTool[]>();

export async function getRemoteConfig() {
  const result = await queryConfig();
  if (result.success) {
    remoteTools.value = result.data.tools;
    if (result.data.updateTime > updateTime.value) {
      updateTime.value = result.data.updateTime;
      const needRemove = new Set<string>();
      for (let i = 0; i < localStorage.length; i++) {
        const storageKey = localStorage.key(i)!;
        if (storageKey.startsWith(StorageKey.ConfigPrefix)) {
          needRemove.add(storageKey);
        }
      }
      for (const tool of result.data.tools) {
        const storageKey = `${StorageKey.ConfigPrefix}${tool._id}`;
        const { _id, ...rest } = tool;
        localStorage.setItem(storageKey, JSON.stringify(rest));
        needRemove.delete(storageKey);
      }
      for (const storageKey of needRemove) {
        localStorage.removeItem(storageKey);
      }
      tools.value = remoteTools.value.map(({ tags, ...rest }) => ({
        ...rest,
        tags: tags.split(","),
      }));
    }
  }
  return result;
}

let safeId = 0;

const idsSet = computed(() => {
  const set = new Set<number>();
  for (const tool of tools.value) {
    set.add(parseInt(tool._id, Constant.Radix));
  }
  return set;
});

watchEffect(() => {
  while (idsSet.value.has(safeId)) {
    safeId++;
  }
});

export function insertTool(tool: Omit<StoreTool, "_id">) {
  updateTime.value = Date.now();
  const id = safeId.toString(Constant.Radix);
  tools.value.push({ _id: id, ...tool });
  const { tags, ...rest } = tool;
  const storageTool: StorageTool = { ...rest, tags: tags.join(",") };
  localStorage.setItem(
    `${StorageKey.ConfigPrefix}${id}`,
    JSON.stringify(storageTool),
  );
}

export function updateTool<T extends Partial<StoreTool> & { _id: "string" }>(
  tool: T,
) {
  const targetTool = tools.value.find(({ _id }) => _id === tool._id);
  if (targetTool) {
    updateTime.value = Date.now();
    for (const key in tool) {
      // @ts-ignore
      targetTool[key] = tool[key];
    }
    const { _id, tags, ...rest } = targetTool;
    const storageTool: StorageTool = { ...rest, tags: tags.join(",") };
    localStorage.setItem(
      `${StorageKey.ConfigPrefix}${tool._id}`,
      JSON.stringify(storageTool),
    );
  }
}

export function deleteTool(id: string) {
  const index = tools.value.findIndex((tool) => tool._id === id);
  if (index >= 0) {
    updateTime.value = Date.now();
    tools.value.splice(index, 1);
    localStorage.removeItem(`${StorageKey.ConfigPrefix}${id}`);
  }
}
