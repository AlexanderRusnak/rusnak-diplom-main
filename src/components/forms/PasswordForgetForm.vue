<template>
  <div class="password-forget-form">
    <div class="password-forget-form__inputs">
      <div class="password-forget-form__input-container">
        <BaseInput
          v-model="form.email.value"
          class="password-forget-form__input"
          :class="{ invalid: !form.email.valid && form.email.touched }"
          placeholder="Email"
          type="email"
          :isOpened="true"
          @blur="form.email.blur"
        />
        <div
          v-if="form.email.touched && form.email.errors.required"
          class="error-message"
        >
          Поле должно быть заполнено
        </div>
        <div
          v-else-if="form.email.touched && form.email.errors.isEmail"
          class="error-message"
        >
          Введите корректный email
        </div>
      </div>
    </div>
    <div class="password-forget-form__button-container">
      <BaseButton
        @click="submitForm"
        :isWhite="true"
        :size="'large'"
        :disabled="!form.valid"
        :class="{ button_disabled: !form.valid }"
        >зарегистрироваться</BaseButton
      >
    </div>
  </div>
</template>

<script setup>
import { useForm } from "@/use/form";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";

// валидаторы
const required = (value) => !!value;
const isEmail = (value) => {
  const regexp =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

  return regexp.test(value);
};

// использование хука useForm для передачи
// хуку useField в дальнейшем и валидации полей
const form = useForm({
  email: {
    value: "",
    validators: { required, isEmail },
  },
});

// метод при нажатии кнопки submit
const submitForm = () => {
  console.log("Email: ", form.email.value);
};
</script>

<style lang="scss" scoped>
.invalid {
  border-bottom: 2px solid red;
  outline: none;
}

.button_disabled {
  opacity: 0.5 !important;
  cursor: not-allowed;
}

.error-message {
  margin-top: 5px;
  font-size: 13px;
  color: red;
  text-align: center;
}

.password-forget-form {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__input-container {
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
  }

  &__button-container {
    margin-top: 15px;
    margin-bottom: 30px;
  }
}
</style>
