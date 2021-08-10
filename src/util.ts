export function ParseCheckScore(result: number[]): [number, number][] {
  const length = result.length;
  let i = 1;
  const out: [number, number][] = [[result[0], result[0]]];
  while (i < length) {
    if (result[i] == result[i - 1] + 1) {
      out[out.length - 1][1] = result[i];
    } else {
      out.push([result[i], result[i]]);
    }
    i++;
  }
  return out;
}

export function GetScore(
  source: string,
  target: string,
  results: [number, number][][] = [],
  sourceIndex = 0,
  targetIndex = 0,
  pos: number[] = [],
): void {
  const targetLength = target.length - targetIndex;
  if (targetLength === 0) {
    results.push(ParseCheckScore(pos));
  } else {
    const sourceLength = source.length - sourceIndex;
    const end = sourceLength - targetLength;
    if (end >= 0) {
      let i = 0;
      while (i <= end) {
        if (source[sourceIndex + i] === target[targetIndex]) {
          pos.push(sourceIndex + i);
          GetScore(
            source,
            target,
            results,
            sourceIndex + i + 1,
            targetIndex + 1,
            pos,
          );
          pos.pop();
        }
        i++;
      }
    }
  }
}

export function DefaultSorter<T extends string | number>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
