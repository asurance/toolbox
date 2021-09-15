<template>
  <section class="card new" @click="onClick">
    <Plus />
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Plus from "@/svg/Plus.vue";

export default defineComponent({
  components: { Plus },
});
</script>

<style lang="less">
.card.new {
  justify-content: center;
  align-items: center;
  & > svg {
    width: 4em;
    height: 4em;
  }
}
</style>
