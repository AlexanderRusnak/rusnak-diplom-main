<template>
  <input
    :value="props.modelValue"
    :class="{
      input: true,
      input_closed: !props.isOpened,
      input_opened: props.isOpened,
    }"
    @input="updateInput"
    type="text"
  />
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["modelValue", "isOpened"]);

const emit = defineEmits("updateInput");

const updateInput = () => {
  emit("update:modelValue", event.target.value);
};
</script>

<style lang="scss" scoped>
.input {
  all: unset;
  background-color: white;

  &:focus {
    border-color: black;
  }
}

.input_opened {
  text-align: center;
  width: 284px;
  height: 42px;
  border-bottom: 1px solid #9f9f9f;
}

.input_closed {
  border: 1px solid #cccccc;
  border-radius: 5px;
}
</style>
