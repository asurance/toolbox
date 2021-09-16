<template>
  <teleport to="body">
    <div class="modal-mask">
      <section class="modal">
        <form>
          <label>
            <span>标题：</span>
            <input v-model="form.name" />
          </label>
          <label>
            <span>链接：</span>
            <input v-model="form.url" />
          </label>
          <label>
            <span>标签：</span>
            <Select
              :options="allTags"
              :selected="form.tags"
              @Add="onTagAdd"
              @Delete="onTagDelete"
            />
          </label>
          <label>
            <span>描述：</span>
            <textarea v-model="form.description" />
          </label>
        </form>
        <footer>
          <button @click="onClickClose">关闭</button>
        </footer>
      </section>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import Select from "@/components/Select.vue";
import { allTags } from "@/store/tools";
import { StoreTool } from "@/interfaces/tool";

export default defineComponent({
  components: { Select },
  props: {
    tool: {
      type: Object as PropType<StoreTool>,
      required: true,
    },
    onClose: Function as PropType<() => void>,
  },
  setup(props) {
    const onClickClose = () => {
      props.onClose?.();
    };
    // eslint-disable-next-line vue/no-setup-props-destructure
    const form = props.tool;
    const onTagAdd = (option: string) => {
      form.tags.push(option);
    };
    const onTagDelete = (option: string) => {
      const index = form.tags.indexOf(option);
      if (index >= 0) {
        form.tags.splice(index, 1);
      }
    };
    return {
      onClickClose,
      form,
      allTags,
      onTagAdd,
      onTagDelete,
    };
  },
});
</script>

<style lang="less">
@import "@/variant.less";
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  & > .modal {
    display: flex;
    flex-direction: column;
    border-radius: 0.5em;
    color: @card-article;
    border: 1px solid currentColor;
    backdrop-filter: blur(2px);
    background-color: fade(@card-background, 80);
    & > header {
      text-align: center;
      font-size: 2em;
      padding-bottom: 0.5em;
      border-bottom: 1px solid currentColor;
    }
    & > form {
      display: flex;
      flex-direction: column;
      padding: 1em;
      & > label {
        margin: 0.5em;
        display: flex;
        & > span {
          margin-top: 0.1em;
        }
        & > input,
        & > textArea {
          flex: 1 1 auto;
          color: currentColor;
          border: 1px solid currentColor;
          border-radius: 0.2em;
          padding: 0.2em 0.5em;
          outline: none;
          background: none;
        }
        & > textArea {
          overflow-y: hidden;
          resize: vertical;
          width: 20em;
          min-height: 5em;
          max-height: 10em;
        }
      }
    }
    & > footer {
      display: flex;
      justify-content: center;
      padding: 1em;
      border-top: 1px solid currentColor;
      button {
        outline: none;
        border-radius: 0.5em;
        padding: 0.5em 1em;
        border: 1px solid currentColor;
        color: currentColor;
        background-color: @tag-background;
        margin: 0 0.2em;
        transition: all 0.5s;
        &:hover,
        &:active {
          color: @font-color-select;
          background-color: @tag-background-select;
        }
      }
    }
  }
}
</style>
