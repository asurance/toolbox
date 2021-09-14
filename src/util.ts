export function DefaultSorter<T extends string | number>(a: T, b: T): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

export function ParseError(error: unknown): string {
  if (typeof error === "string") {
    return error;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return `unknown error ${error}`;
  }
}
