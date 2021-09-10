import { Ref } from "vue";
import { StoreTool } from "@/interfaces/tool";
import { tools, tagsSet } from "@/store/tools";

export default function useTools(): {
  tools: Ref<StoreTool[]>;
  tags: Ref<Set<string>>;
} {
  return {
    tools,
    tags: tagsSet,
  };
}
