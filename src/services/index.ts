import { QueryKeyResult, QueryConfigResult } from "@/interfaces/api";
import useErrorLog from "./useErrorLog";
import useGet from "./useGet";

export const queryKey = useErrorLog(
  useGet<[password: string], QueryKeyResult>(
    (password: string) =>
      `https://service-o4djoxjf-1255580031.sh.apigw.tencentcs.com/release/queryKey?app=toolbox&password=${password}`,
  ),
);

export const queryConfig = useErrorLog(
  useGet<[], QueryConfigResult>(
    () =>
      "https://service-0kn4qeof-1255580031.sh.apigw.tencentcs.com/release/toolbox_queryConfig",
  ),
);
