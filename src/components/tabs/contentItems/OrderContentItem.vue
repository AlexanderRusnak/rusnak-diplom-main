<template>
  <div
    @mouseenter="handleCrossVisibility(true)"
    @mouseleave="handleCrossVisibility(false)"
    class="content-item"
  >
    <div class="field field_position content-item__field">
      <BaseInput
        :value="props.orderItem.position"
        @input="handleContentPositionChanges"
        placeholder="Позиция"
        class="field__input field__input_position"
      />
    </div>
    <div class="field field_amount content-item__field">
      <BaseInput
        :value="props.orderItem.amount"
        @input="handleContentAmountChanges"
        placeholder="0"
        class="field__input field__input_amount"
      />
    </div>
    <div class="field field_sum content-item__field">
      <div class="field__sum">12345₽</div>
    </div>
    <div class="field field_cross content-item__field">
      <div
        @click="handlePositionDelete"
        :class="{ field__cross: true, field__cross_white: isCrossVisible }"
      >
        ✖
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
// import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";

const props = defineProps(["orderItem"]);
const emit = defineEmits([
  "content-position-changed",
  "content-amount-changed",
  "content-position-delete",
]);

const handleContentPositionChanges = () => {
  emit("content-position-changed", props.orderItem.id, event.target.value);
};

const handleContentAmountChanges = () => {
  emit("content-amount-changed", props.orderItem.id, event.target.value);
};

const handlePositionDelete = () => {
  emit("content-position-delete", props.orderItem.id);
};

const isCrossVisible = ref(false);

const handleCrossVisibility = (visibility) => {
  isCrossVisible.value = visibility;
};
</script>

<style lang="scss" scoped>
.content-item {
  margin-top: 10px;
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

    &_cross {
      width: 20px;
      height: 31px;
      cursor: pointer;
      color: white;

      &:hover {
        color: black;
      }
    }
  }

  &__sum {
    width: 83px;
    height: 31px;

    text-align: center;
    vertical-align: middle;
    line-height: 31px;
  }

  &__cross {
    cursor: pointer;
    color: white;

    &_white {
      color: black;
    }
  }
}
</style>
