import useTools from "@/hooks/useTools";
import Tools from "@/config";
import { unref } from "vue";

export type RecordType = "tag" | "tool";

class OperationRecord {
  private records: Map<string, number[]>;
  private scores: Map<string, number>;
  constructor() {
    this.records = new Map<string, number[]>();
    this.scores = new Map<string, number>();
    const { tools, tags } = useTools();
    for (const tool of tools) {
      const key = `tool-${tool.name}`;
      const record = localStorage.getItem(key);
      if (record) {
        this.records.set(
          key,
          record.split(",").map((str) => parseInt(str, 36)),
        );
      } else {
        this.records.set(key, []);
      }
    }
    for (const tag of unref(tags)) {
      const key = `tag-${tag}`;
      const record = localStorage.getItem(key);
      if (record) {
        this.records.set(
          key,
          record.split(",").map((str) => parseInt(str, 36)),
        );
      } else {
        this.records.set(key, []);
      }
    }
    const now = Date.now();
    for (const [key, record] of this.records) {
      let index = 0;
      let deleteCount = 0;
      let score = 0;
      while (index < record.length) {
        if (now - record[index] > 1000 * 60 * 60 * 24 * 30) {
          deleteCount++;
          index++;
        } else {
          break;
        }
      }
      while (index < record.length) {
        if (now - record[index] > 1000 * 60 * 60 * 24 * 7) {
          score += 0.5;
          index++;
        } else {
          break;
        }
      }
      while (index < record.length) {
        if (now - record[index] > 1000 * 60 * 60 * 24 * 1) {
          score += 1;
          index++;
        } else {
          break;
        }
      }
      score += 2 * (record.length - index);
      if (deleteCount > 0) {
        record.splice(0, 2);
        localStorage.setItem(
          key,
          record.map((val) => val.toString(36)).join(","),
        );
      }
      this.scores.set(key, score);
    }
  }

  getScore(name: string, type: RecordType) {
    return this.scores.get(`${type}-${name}`) ?? 0;
  }

  addRecord(name: string, type: RecordType) {
    const key = `${type}-${name}`;
    const records = this.records.get(key);
    if (records) {
      records.push(Date.now());
      localStorage.setItem(
        key,
        records.map((val) => val.toString(36)).join(","),
      );
    }
  }
}

const Record = new OperationRecord();

export default Record;
