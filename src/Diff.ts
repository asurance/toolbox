import { RemoteTool } from "@/interfaces/tool";
import { remoteToolMap, toolMap } from "@/store/tools";
import { DiffOpr } from "@/interfaces/diff";

function diff() {
  const diffs: DiffOpr[] = [];
  if (remoteToolMap.value) {
    for (const remoteId of remoteToolMap.value.keys()) {
      if (!toolMap.value.has(remoteId)) {
        diffs.push({ type: "delete", data: remoteId });
      }
    }
    for (const [id, tool] of toolMap.value) {
      const remoteTool = remoteToolMap.value.get(id);
      const expectRemoteTool: RemoteTool = {
        _id: tool._id,
        description: tool.description,
        name: tool.name,
        tags: tool.tags.join(","),
        url: tool.url,
      };
      if (remoteTool) {
        const updateData: Partial<RemoteTool> & { _id: string } = {
          _id: tool._id,
        };
        for (const _ in remoteTool) {
          const key = _ as keyof RemoteTool;
          if (remoteTool[key] !== expectRemoteTool[key]) {
            updateData[key] = remoteTool[key];
          }
        }
        if (Object.keys(updateData).length > 1) {
          diffs.push({
            type: "update",
            data: updateData,
          });
        }
      } else {
        diffs.push({
          type: "insert",
          data: expectRemoteTool,
        });
      }
    }
  }
  return diffs;
}
