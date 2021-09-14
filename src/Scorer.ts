export type Hightlight = {
  str: string;
  flag: boolean;
};

export type ScoreResult = {
  score: number;
  highlights: Hightlight[];
};

export class Scorer {
  private source = "";
  private check = "";
  private result: ScoreResult = {
    score: 0,
    highlights: [],
  };
  private highlights: number[] = [];
  score(source: string, check: string): ScoreResult {
    this.initVar(source, check);
    this.tickAndScore(0, 0);
    return this.result;
  }
  private initVar(source: string, check: string) {
    this.source = source;
    this.check = check;
    this.result = {
      score: 0,
      highlights: [],
    };
    this.highlights.length = 0;
  }
  private calScore() {
    const curHighlights: Hightlight[] = [];
    if (this.highlights[0] > 0) {
      curHighlights.push({
        str: this.source.slice(0, this.highlights[0]),
        flag: false,
      });
    }
    let start = this.highlights[0];
    for (let i = 1; i < this.highlights.length; i++) {
      if (this.highlights[i] !== this.highlights[i - 1] + 1) {
        curHighlights.push({
          str: this.source.slice(start, this.highlights[i - 1] + 1),
          flag: true,
        });
        curHighlights.push({
          str: this.source.slice(
            this.highlights[i - 1] + 1,
            this.highlights[i],
          ),
          flag: false,
        });
        start = this.highlights[i];
      }
    }
    const last = this.highlights[this.highlights.length - 1];
    curHighlights.push({ str: this.source.slice(start, last + 1), flag: true });
    if (last + 1 < this.source.length) {
      curHighlights.push({ str: this.source.slice(last + 1), flag: false });
    }
    const score = curHighlights.reduce(
      (pre, cur) => pre + (cur.flag ? cur.str.length * cur.str.length : 0),
      0,
    );
    if (score > this.result.score) {
      this.result.score = score;
      this.result.highlights = curHighlights;
    }
  }
  private tickAndScore(sourceIndex: number, checkIndex: number) {
    const checkLength = this.check.length - checkIndex;
    if (checkLength === 0) {
      this.calScore();
    } else {
      const sourceLength = this.source.length - sourceIndex;
      const end = sourceLength - checkLength;
      if (end >= 0) {
        let i = 0;
        while (i <= end) {
          if (
            this.source[sourceIndex + i].toLowerCase() ===
            this.check[checkIndex].toLowerCase()
          ) {
            this.highlights.push(sourceIndex + i);
            this.tickAndScore(sourceIndex + i + 1, checkIndex + 1);
            this.highlights.pop();
          }
          i++;
        }
      }
    }
  }
}
