import {
  ref,
  computed,
  watchEffect,
  watch,
  WatchStopHandle,
  reactive,
} from "vue";
import { RemoteTool, StorageTool, StoreTool } from "@/interfaces/tool";
import { queryConfig } from "@/services";
import { Constant, StorageKey } from "@/interfaces/constant";
import { APIResult, QueryConfigResult } from "@/interfaces/api";

function getUpdateTime() {
  const updateTime = localStorage.getItem(StorageKey.UpdateTime);
  if (updateTime !== null) {
    return parseInt(updateTime, Constant.Radix);
  } else {
    return 0;
  }
}

export const updateTime = ref(getUpdateTime());

watch(updateTime, (time) => {
  localStorage.setItem(StorageKey.UpdateTime, time.toString(Constant.Radix));
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

const toolWatchMap = new Map<string, WatchStopHandle>();

function watchTool(tool: StoreTool, immediate = false) {
  const stopHandler = watch(
    tool,
    (tool) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, tags, ...rest } = tool;
      const storageTool: StorageTool = { ...rest, tags: tags.join(",") };
      localStorage.setItem(
        `${StorageKey.ConfigPrefix}${tool._id}`,
        JSON.stringify(storageTool),
      );
    },
    {
      immediate,
    },
  );
  toolWatchMap.set(tool._id, stopHandler);
}

function stopWatch(id: string) {
  toolWatchMap.get(id)?.();
  toolWatchMap.delete(id);
  localStorage.removeItem(`${StorageKey.ConfigPrefix}${id}`);
}

for (const tool of tools.value) {
  watchTool(tool);
}

export const toolMap = computed(() => {
  const map = new Map<string, StoreTool>();
  for (const tool of tools.value) {
    map.set(tool._id, tool);
  }
  return map;
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

const remoteTools = ref<RemoteTool[] | null>(null);

export const remoteToolMap = computed(() => {
  if (remoteTools.value) {
    const map = new Map<string, RemoteTool>();
    for (const tool of remoteTools.value) {
      map.set(tool._id, tool);
    }
    return map;
  } else {
    return null;
  }
});

export async function getRemoteConfig(): Promise<APIResult<QueryConfigResult>> {
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const defaultTool: Omit<StoreTool, "_id"> = {
  name: "",
  url: "",
  tags: [],
  description: "",
};

export function insertTool(): void {
  updateTime.value = Date.now();
  const id = safeId.toString(Constant.Radix);
  const tool = reactive({ _id: id, ...defaultTool });
  tools.value.push(tool);
  watchTool(tool, true);
}

export function deleteTool(id: string): void {
  const index = tools.value.findIndex((tool) => tool._id === id);
  if (index >= 0) {
    updateTime.value = Date.now();
    tools.value.splice(index, 1);
    stopWatch(id);
  }
}
