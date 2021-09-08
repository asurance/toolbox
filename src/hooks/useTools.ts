import { Ref } from "vue";
import { Tool } from "@/interfaces";
import { localTools, tagsSet } from "@/store/tools";

export default function useTools(): {
  tools: Tool[];
  tags: Ref<Set<string>>;
} {
  return {
    tools: localTools.tools,
    tags: tagsSet,
  };
}
