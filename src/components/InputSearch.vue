<template>
  <label class="search">
    <Search />
    <input
      type="text"
      placeholder="搜索"
      :value="searchValue"
      @input.prevent="onSearchChange"
    />
  </label>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import Search from "@/svg/Search.vue";

export default defineComponent({
  components: { Search },
  props: {
    searchValue: String,
    onSearchChange: Function as PropType<(evt: Event) => void>,
  },
});
</script>

<style lang="less">
@import "@/variant.less";
.search {
  height: 2em;
  padding: 1em;
  border-radius: 1em;
  border: 1px solid currentColor;
  display: flex;
  align-items: center;
  & > svg {
    width: 2em;
    height: 2em;
    position: absolute;
  }
  & > input[type="text"] {
    padding-left: 2em;
    font-size: 1.5em;
    color: @font-color;
  }
}
</style>
