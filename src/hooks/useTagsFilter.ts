import { computed, DeepReadonly, reactive, Ref, unref } from "vue";
import { Tool } from "@/interfaces";

export default function useTagFilter(
  rawTools: DeepReadonly<Tool[]> | Ref<DeepReadonly<Tool>[]>,
): {
  selectedTag: Set<string>;
  filteredTools: Ref<DeepReadonly<Tool[]>>;
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
