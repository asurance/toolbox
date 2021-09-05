import { shallowReactive } from "vue";

type UserStore = {
  user: { secretId: string; secretKey: string } | null;
};

export default shallowReactive<UserStore>({
  user: null,
});
