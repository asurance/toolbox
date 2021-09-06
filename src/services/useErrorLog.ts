import { APIResult } from "../interfaces/api";

export default function useErrorLog<ARGS extends Array<unknown>, RSEULT>(
  fn: (...args: ARGS) => Promise<APIResult<RSEULT>>,
) {
  return async (...args: ARGS) => {
    const result = await fn(...args);
    if (!result.success) {
      console.log(result.message);
    }
    return result;
  };
}
