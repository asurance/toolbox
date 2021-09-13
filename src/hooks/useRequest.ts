import { ref, Ref } from "vue";
import { APIResult } from "@/interfaces/api";

export default function useRequest<ARGS extends Array<unknown>, RESULT>(
  request: (...args: ARGS) => Promise<APIResult<RESULT>>,
  defaultSuccess = true,
): {
  loading: Ref<boolean>;
  success: Ref<boolean>;
  send: (...args: ARGS) => Promise<APIResult<RESULT>>;
} {
  const loading = ref(false);
  const success = ref(defaultSuccess);
  const send = async (...args: ARGS) => {
    success.value = true;
    loading.value = true;
    const result = await request(...args);
    success.value = result.success;
    loading.value = false;
    return result;
  };
  return {
    loading,
    success,
    send,
  };
}
