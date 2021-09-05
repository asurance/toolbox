import { queryKey } from "@/services";
import user from "./store/user";

window.login = async (password) => {
  const result = await queryKey(password);
  if (result.success) {
    user.user = result.data;
  } else {
    console.log(result.message);
  }
};
