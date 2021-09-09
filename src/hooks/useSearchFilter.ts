import { computed, DeepReadonly, Ref, ref, unref } from "vue";
import { StoreTool } from "@/interfaces";
import { DefaultSorter, GetScore } from "@/util";
import Record from "@/record";

const BackUpSorter = (
  a: DeepReadonly<StoreTool>,
  b: DeepReadonly<StoreTool>,
) => {
  const aScore = Record.getScore(a.name, "tool");
  const bScore = Record.getScore(b.name, "tool");
  if (aScore < bScore) {
    return 1;
  } else if (aScore > bScore) {
    return -1;
  } else {
    return DefaultSorter(a.name, b.name);
  }
};

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
            return BackUpSorter(a.tool, b.tool);
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
          return BackUpSorter(a.tool, b.tool);
        });
    }
  });
  return {
    filteredResult,
    searchValue,
    onSearchChange,
  };
}
