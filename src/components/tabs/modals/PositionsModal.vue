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
            v-model="form.positionName.value"
            placeholder="Название позиции"
            type="text"
            :isOpened="false"
            :class="{
              modal__input: true,
              invalid: !form.positionName.valid && form.positionName.touched,
            }"
            @blur="form.positionName.blur"
          />

          <BaseInputError
            v-if="
              form.positionName.touched && form.positionName.errors.required
            "
          >
            Поле должно быть заполнено
          </BaseInputError>
        </div>
        <div class="modal__input-container">
          <BaseInput
            v-model="form.positionPrice.value"
            placeholder="Цена позиции"
            type="text"
            :isOpened="false"
            :class="{
              modal__input: true,
              invalid: !form.positionPrice.valid && form.positionPrice.touched,
            }"
            @blur="form.positionPrice.blur"
          />

          <BaseInputError
            v-if="
              form.positionPrice.touched && form.positionPrice.errors.required
            "
          >
            Поле должно быть заполнено
          </BaseInputError>
        </div>
        <div class="modal__input-container">
          <div class="modal__select-label">
            <div>Категория:</div>
            <BaseSelect
              v-model="form.positionCategory.value"
              :class="{
                modal__select: true,
                invalid:
                  !form.positionCategory.valid && form.positionCategory.touched,
              }"
              @blur="form.positionCategory.blur"
            >
              <option v-for="category in props.categories" :key="category.id">
                {{ category.name }}
              </option>
            </BaseSelect>
          </div>

          <BaseInputError
            v-if="
              form.positionCategory.touched &&
              form.positionCategory.errors.required
            "
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
          @click="deletePosition"
          class="modal__delete"
        >
          удалить позицию
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
import BaseSelect from "@/components/base/BaseSelect.vue";

const props = defineProps([
  "isModalShown",
  "isFormatting",
  "selectedObject",
  "categories",
]);

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
  positionName: {
    value: "",
    validators: { required },
  },
  positionPrice: {
    value: "",
    validators: { required },
  },
  positionCategory: {
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
    console.log("Создание позиции");

    let position = {
      id: new Date().getTime().toString(),
      name: form.positionName.value,
      price: form.positionPrice.value,
      category: form.positionCategory.value,
    };

    FirebaseService.position(position.id).set(position);
  } else {
    console.log("Редактирование позиции");

    let changedPosition = {};

    Object.assign(changedPosition, props.selectedObject);

    changedPosition.name = form.positionName.value;
    changedPosition.price = form.positionPrice.value;
    changedPosition.category = form.positionCategory.value;

    FirebaseService.position(`${changedPosition.id}`).set(changedPosition);
  }

  handleModalClose();
};

const deletePosition = () => {
  FirebaseService.position(`${props.selectedObject.id}`).remove();

  handleModalClose();
};

watch(
  () => props.selectedObject,
  () => {
    form.positionName.value = props.selectedObject.name;
    form.positionPrice.value = props.selectedObject.price;
    form.positionCategory.value = props.selectedObject.category;
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
      margin-top: 15px;
      text-align: center;

      &:first-child {
        margin-top: 0px;
      }
    }
  }

  &__select {
    width: 280px;

    &-label {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
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
