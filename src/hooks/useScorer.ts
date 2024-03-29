import { Ref, computed } from "vue";
import { Hightlight, Scorer } from "@/Scorer";
import { StoreTool } from "@/interfaces/tool";

const scorer = new Scorer();

export type ToolWithScore = {
  tool: StoreTool;
  score: number;
  highlights: Hightlight[];
};

export default function useScorer(
  tools: Ref<StoreTool[]>,
  check: Ref<string>,
): Ref<ToolWithScore[]> {
  const scoreResult = computed<ToolWithScore[]>(() => {
    if (check.value) {
      return tools.value
        .map<ToolWithScore>((tool) => {
          const result = scorer.score(tool.name, check.value);
          return {
            tool,
            ...result,
          };
        })
        .filter((result) => result.score > 0)
        .sort((a, b) => {
          return b.score - a.score;
        });
    } else {
      return tools.value.map<ToolWithScore>((tool) => ({
        tool,
        score: 0,
        highlights: [{ str: tool.name, flag: false }],
      }));
    }
  });
  return scoreResult;
}
