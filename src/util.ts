export function GetCheckScore(result: number[]): number {
  let sum = 0;
  const length = result.length;
  let i = 1;
  let cur = 1;
  while (i < length) {
    if (result[i] === result[i - 1] + 1) {
      cur++;
    } else {
      sum += cur * cur;
      cur = 1;
    }
    i++;
  }
  sum += cur * cur;
  return sum;
}

export function GetScore(
  source: string,
  target: string,
  out: number[],
): number {
  const targetLength = target.length;
  if (targetLength === 0) {
    return GetCheckScore(out);
  } else {
    const sourceLength = source.length;
    const end = sourceLength - targetLength;
    if (end >= 0) {
      let i = 0;
      let score = 0;
      while (i <= end) {
        if (source[i] === target[0]) {
          out.push(i);
          const next = GetScore(source.slice(i + 1), target.slice(1), out);
          if (next > score) {
            score = next;
          }
          out.pop();
        }
        i++;
      }
      return score;
    } else {
      return 0;
    }
  }
}

export function DefaultSorter<T extends string | number>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
