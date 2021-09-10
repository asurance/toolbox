import { shallowRef } from "vue";
import { queryKey } from "@/services";

type User = { secretId: string; secretKey: string } | null;

export const user = shallowRef<User>(null);

export async function Login(password: string): Promise<void> {
  const result = await queryKey(password);
  if (result.success) {
    user.value = result.data;
  }
}
