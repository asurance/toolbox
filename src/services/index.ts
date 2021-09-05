import { Tool } from "../interfaces";
import { useGet } from "./useGet";

export const queryKey = useGet<
  [password: string],
  { secretId: string; secretKey: string }
>(
  (password: string) =>
    `https://service-o4djoxjf-1255580031.sh.apigw.tencentcs.com/release/queryKey?app=toolbox&password=${password}`,
);

export const queryConfig = useGet<[], Tool[]>(
  () =>
    "https://service-0kn4qeof-1255580031.sh.apigw.tencentcs.com/release/toolbox_queryConfig",
);
