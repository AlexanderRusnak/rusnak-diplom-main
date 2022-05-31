<template>
  <div>
    <BaseModal
      @modal-closed="handleModalClose"
      :is-modal-shown="props.isModalShown"
    >
      <span class="modal__title">Редактор</span>
      <div class="modal__content">
        <div class="modal__input-container">
          <BaseInput
            title="Имя"
            v-model="form.waiterName.value"
            placeholder="Имя официанта"
            type="text"
            :isOpened="false"
            :class="{
              modal__input: true,
              invalid: !form.waiterName.valid && form.waiterName.touched,
            }"
            @blur="form.waiterName.blur"
          />

          <BaseInputError
            v-if="form.waiterName.touched && form.waiterName.errors.required"
          >
            Поле должно быть заполнено
          </BaseInputError>
        </div>
        <div class="modal__buttons">
          <BaseButton
            @click="submitForm"
            :class="{ modal__button: true, button_disabled: !form.valid }"
            :isWhite="false"
            :size="'large'"
            :disabled="!form.valid"
          >
            сохранить
          </BaseButton>

          <BaseButton
            @click="handleModalClose"
            class="modal__button"
            :isWhite="true"
            :size="'large'"
          >
            отменить
          </BaseButton>
        </div>
        <div
          :hidden="!props.isFormatting"
          @click="deleteWaiter"
          class="modal__delete"
        >
          удалить официанта
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch } from "vue";
import { useForm } from "@/use/form";
import FirebaseService from "@/services/FirebaseService";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseInputError from "@/components/base/BaseInputError.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps(["isModalShown", "isFormatting", "selectedObject"]);

const emit = defineEmits(["modal-closed"]);

const handleModalClose = () => {
  cleanForm();

  emit("modal-closed");
};

// валидаторы
const required = (value) => !!value;

// использование хука useForm для передачи
// хуку useField в дальнейшем и валидации полей
const form = useForm({
  waiterName: {
    value: "",
    validators: { required },
  },
});

//очистка формы
const cleanForm = () => {
  for (let prop in form) {
    if (form[prop].value !== undefined) {
      form[prop].value = "";
      form[prop].touched = false;
    }
  }
};

const submitForm = () => {
  if (!props.isFormatting) {
    console.log("Создание официанта");

    let waiter = {
      id: new Date().getTime().toString(),
      name: form.waiterName.value,
    };

    FirebaseService.waiter(waiter.id).set(waiter);
  } else {
    console.log("Редактирование официанта");

    let changedWaiter = {};

    Object.assign(changedWaiter, props.selectedObject);

    changedWaiter.name = form.waiterName.value;

    FirebaseService.waiter(`${changedWaiter.id}`).set(changedWaiter);
  }

  handleModalClose();
};

const deleteWaiter = () => {
  FirebaseService.waiter(`${props.selectedObject.id}`).remove();

  handleModalClose();
};

watch(
  () => props.selectedObject,
  () => {
    if (props.selectedObject !== null) {
      form.waiterName.value = props.selectedObject.name;
    }
  }
);
</script>

<style lang="scss" scoped>
.modal {
  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    text-align: center;
  }

  &__content {
    margin-top: 30px;
  }

  &__input {
    width: 404px;
    height: 31px;
    padding: 0px 10px;

    &-container {
      text-align: center;
    }
  }

  &__buttons {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__button {
    &:last-child {
      margin-top: 10px;
    }
  }

  &__delete {
    margin-top: 30px;
    text-align: center;
    cursor: pointer;
  }
}

.button_disabled {
  opacity: 0.5 !important;
  cursor: not-allowed;
}

.invalid {
  border-bottom: 2px solid red;
  outline: none;
}
</style>
