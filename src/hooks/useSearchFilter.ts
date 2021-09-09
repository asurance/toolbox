import { computed, DeepReadonly, Ref, ref, unref } from "vue";
import { StoreTool } from "@/interfaces";
import { DefaultSorter, GetScore } from "@/util";

export default function useSearchFilter(
  rawTools: DeepReadonly<StoreTool[]> | Ref<DeepReadonly<StoreTool[]>>,
): {
  filteredResult: Ref<
    {
      tool: DeepReadonly<StoreTool>;
      score: number;
      pos: [number, number][];
    }[]
  >;
  searchValue: Ref<string>;
  onSearchChange(evt: Event): void;
} {
  const searchValue = ref("");
  const onSearchChange = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    searchValue.value = target.value;
  };
  const filteredResult = computed(() => {
    if (searchValue.value) {
      return unref(rawTools)
        .map((tool) => {
          const results: [number, number][][] = [];
          GetScore(
            tool.name.toLowerCase(),
            searchValue.value.toLowerCase(),
            results,
          );
          let maxScore = 0;
          let pos: [number, number][] = [];
          for (const result of results) {
            const score = result.reduce(
              (pre, [start, end]) =>
                pre + (end - start + 1) * (end - start + 1),
              0,
            );
            if (score > maxScore) {
              maxScore = score;
              pos = result;
            }
          }
          return {
            tool,
            score: maxScore,
            pos,
          };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => {
          if (a.score < b.score) {
            return 1;
          } else if (a.score > b.score) {
            return -1;
          } else {
            return DefaultSorter(a.tool.name, b.tool.name);
          }
        });
    } else {
      return unref(rawTools)
        .map((tool) => ({
          tool,
          score: 0,
          pos: [],
        }))
        .sort((a, b) => {
          return DefaultSorter(a.tool.name, b.tool.name);
        });
    }
  });
  return {
    filteredResult,
    searchValue,
    onSearchChange,
  };
}
