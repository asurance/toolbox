import Tools from "@/config";

export type RecordType = "tag" | "tool";

type Key = `${RecordType}-${string}`;

class OperationRecord {
  private records: Map<Key, number[]>;
  private scores: Map<Key, number>;
  constructor() {
    this.records = new Map<Key, number[]>();
    this.scores = new Map<Key, number>();
    for (const tool of Tools) {
      const key: Key = `tool-${tool.name}`;
      const record = sessionStorage.getItem(key);
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
        sessionStorage.setItem(
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
    const key: Key = `${type}-${name}`;
    const records = this.records.get(key);
    if (records) {
      records.push(Date.now());
      sessionStorage.setItem(
        key,
        records.map((val) => val.toString(36)).join(","),
      );
    }
  }
}

const Record = new OperationRecord();

export default Record;
