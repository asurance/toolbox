import { computed, DeepReadonly, readonly, Ref } from "vue";
import Tools from "@/config";
import { Tag, Tool } from "@/interfaces";

export default function useTools(): {
  tools: DeepReadonly<Tool[]>;
  tags: Ref<Set<Tag>>;
} {
  const tools = readonly(Tools);
  const tags = computed(() => {
    const set = new Set<Tag>();
    for (const tool of tools) {
      for (const tag of tool.tags) {
        set.add(tag);
      }
    }
    return set;
  });
  return {
    tools,
    tags,
  };
}
