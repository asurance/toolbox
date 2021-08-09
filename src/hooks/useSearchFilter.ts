import { computed, DeepReadonly, Ref, ref, unref } from "vue";
import { Tool } from "@/interfaces";

export default function useSearchFilter(
  rawTools: DeepReadonly<Tool[]> | Ref<DeepReadonly<Tool[]>>,
): {
  filteredTools: Ref<DeepReadonly<Tool[]>>;
  searchValue: Ref<string>;
  onSearchChange(evt: Event): void;
} {
  const searchValue = ref("");
  const onSearchChange = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    searchValue.value = target.value;
  };
  const filteredTools = computed(() => {
    if (searchValue.value) {
      return unref(rawTools).filter((tool) =>
        tool.name.includes(searchValue.value),
      );
    } else {
      return unref(rawTools);
    }
  });
  return {
    filteredTools,
    searchValue,
    onSearchChange,
  };
}
