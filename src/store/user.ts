import { ref, computed } from "vue";
import { queryKey } from "@/services";

type User = { secretId: string; secretKey: string } | null;

export const user = ref<User>(null);

export const isLogin = computed(() => user.value !== null);

export async function Login(password: string): Promise<void> {
  const result = await queryKey(password);
  if (result.success) {
    user.value = result.data;
  }
}

export function Logout(): void {
  user.value = null;
}
