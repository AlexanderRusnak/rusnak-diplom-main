<template>
  <div class="content-item">
    <div class="field field_position content-item__field">
      <div class="field__label">Позиция</div>
      <BaseInput
        :value="props.orderItem.position"
        placeholder="Позиция"
        class="field__input field__input_position"
      />
    </div>
    <div class="field field_amount content-item__field">
      <div class="field__label">Кол-во</div>
      <BaseInput
        :value="props.orderItem.amount"
        placeholder="0"
        class="field__input field__input_amount"
      />
    </div>
    <div class="field field_sum content-item__field">
      <div class="field__label">Сумма</div>
      <div class="field__sum">12345₽</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
// import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";

const props = defineProps(["orderItem"]);
// const emit = defineEmits(["updateInput"]);
</script>

<style lang="scss" scoped>
.content-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.field {
  &__label {
    font-size: 12px;
    text-align: center;
    margin-bottom: 10px;
  }

  &__input {
    text-align: center;

    &_position {
      width: 200px;
      height: 31px;
    }

    &_amount {
      width: 78px;
      height: 31px;
    }
  }

  &__sum {
    width: 83px;
    height: 31px;

    text-align: center;
    vertical-align: middle;
    line-height: 31px;
  }
}
</style>
