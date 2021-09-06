import { ParseError } from "@/util";
import { APIResult } from "@/interfaces/api";

export function useGet<ARGS extends Array<unknown>, RESULT>(
  urlBuilder: (...args: ARGS) => string,
): (...args: ARGS) => Promise<APIResult<RESULT>> {
  return async (...args: ARGS) => {
    const url = urlBuilder(...args);
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else {
        return { success: false, message: `【请求失败:${response.status}】` };
      }
    } catch (error) {
      return {
        success: false,
        message: ParseError(error),
      };
    }
  };
}
