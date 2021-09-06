import { enc, HmacSHA1 } from "crypto-js";
import { APIResult } from "../interfaces/api";
import { user } from "../store/user";
import { ParseError } from "../util";

export default function useAuthPost<DATA, RESULT>(
  url: string,
): (data: DATA) => Promise<APIResult<RESULT>> {
  return async (data: DATA) => {
    if (user.value) {
      const { secretId, secretKey } = user.value;
      const now = new Date().toUTCString();
      const source = "toolbox";
      const sign = enc.Base64.stringify(
        HmacSHA1(`x-date: ${now}\nsource: ${source}`, secretKey),
      );
      const auth = `hmac id="${secretId}", algorithm="hmac-sha1", headers="x-date source", signature="${sign}"`;
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Source: source,
            "X-Date": now,
            Authorization: auth,
            "Content-Type": "application/json;charset=utf-8",
          },
          credentials: "include",
        });
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
    } else {
      return {
        success: false,
        message: "Unauthenticated",
      };
    }
  };
}
