<template>
  <select :value="props.modelValue" class="select" @change="handleChange">
    <slot></slot>
  </select>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits("updateInput");
const handleChange = () => {
  emit("update:modelValue", event.target.value);
};
</script>

<style lang="scss" scoped>
.select {
  height: 33px;
  padding: 0px 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;

  &:focus {
    border-color: black;
  }
}
</style>
