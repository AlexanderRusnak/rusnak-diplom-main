<template>
  <div class="control-panel">
    <div>
      <BaseInput
        :value="props.search"
        @input="updateSearch"
        class="control-panel__search-input"
        :isOpened="false"
        type="text"
        placeholder="Поиск..."
      />

      <BaseSelect
        :value="props.positionTypeFilter"
        @change="updatePositionTypeFilter"
        class="control-panel__select"
      >
        <option value="Все типы" selected="selected">Все типы</option>
        <option v-for="type in props.positionTypes" :key="type.id">
          {{ type }}
        </option>
      </BaseSelect>
    </div>

    <BaseButton @click="updateModalStatus" size="small-adaptive">
      создать позицию
    </BaseButton>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";

const props = defineProps(["search", "positionTypeFilter", "positionTypes"]);

const emit = defineEmits([
  "updateSearch",
  "updateModalStatus",
  "updatePositionTypeFilter",
]);

// ! Updates

const updateSearch = () => {
  emit("updateSearch", event.target.value);
};

const updatePositionTypeFilter = () => {
  emit("updatePositionTypeFilter", event.target.value);
};

const updateModalStatus = () => {
  emit("updateModalStatus");
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

  &__select {
    width: 172px;
    margin-left: 5px;
  }
}
</style>
