import { RemoteTool } from "@/interfaces/tool";
import { remoteToolMap, toolMap } from "@/store/tools";
import { UpdateData } from "@/interfaces/diff";

export function diff(): Partial<UpdateData> {
  const inserts: RemoteTool[] = [];
  const updates: (Partial<RemoteTool> & { _id: string })[] = [];
  const deletes: string[] = [];
  if (remoteToolMap.value) {
    for (const remoteId of remoteToolMap.value.keys()) {
      if (!toolMap.value.has(remoteId)) {
        deletes.push(remoteId);
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
            updateData[key] = expectRemoteTool[key];
          }
        }
        if (Object.keys(updateData).length > 1) {
          updates.push(updateData);
        }
      } else {
        inserts.push(expectRemoteTool);
      }
    }
  }
  const result: Partial<UpdateData> = {};
  if (inserts.length > 0) {
    result.inserts = inserts;
  }
  if (updates.length > 0) {
    result.updates = updates;
  }
  if (deletes.length > 0) {
    result.deletes = deletes;
  }
  return result;
}
