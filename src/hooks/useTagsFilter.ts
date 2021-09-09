import { computed, DeepReadonly, reactive, Ref, unref } from "vue";
import { StoreTool } from "@/interfaces";

export default function useTagFilter(
  rawTools: DeepReadonly<StoreTool[]> | Ref<DeepReadonly<StoreTool>[]>,
): {
  selectedTag: Set<string>;
  filteredTools: Ref<DeepReadonly<StoreTool[]>>;
} {
  const selectedTag = reactive(new Set<string>());
  const filteredTools = computed(() => {
    if (selectedTag.size === 0) {
      return unref(rawTools);
    } else {
      return unref(rawTools).filter((tool) => {
        for (const tag of selectedTag) {
          if (!tool.tags.includes(tag)) {
            return false;
          }
        }
        return true;
      });
    }
  });
  return {
    selectedTag,
    filteredTools,
  };
}
