<template>
  <div class="control-panel">
    <BaseInput
      :value="props.search"
      @input="updateSearch"
      class="control-panel__search-input"
      :isOpened="false"
      type="text"
      placeholder="Поиск..."
    />
    <BaseButton @click="updateFormStatus" size="small-adaptive"
      >создать категорию</BaseButton
    >
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps(["search"]);

const emit = defineEmits(["updateInput", "updateFormStatus"]);

// ! Updates

const updateSearch = () => {
  emit("updateSearch", event.target.value);
};

const updateFormStatus = () => {
  emit("updateFormStatus");
};
</script>

<style lang="scss" scoped>
.control-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;

  &__search-input {
    width: 150px;
    height: 31px;
    padding: 0px 10px;
    font-size: 13px;
  }
}
</style>
