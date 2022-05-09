<template>
  <div class="sign-up-form">
    <div class="sign-up-form__inputs">
      <div class="sign-up-form__input-container">
        <BaseInput
          v-model="form.username.value"
          class="sign-up-form__input"
          :class="{ invalid: !form.username.valid && form.username.touched }"
          placeholder="Имя пользователя"
          type="text"
          :isOpened="true"
          @blur="form.username.blur"
        />
        <div
          v-if="form.username.touched && form.username.errors.required"
          class="error-message"
        >
          Поле должно быть заполнено
        </div>
      </div>
      <div class="sign-up-form__input-container">
        <BaseInput
          v-model="form.email.value"
          class="sign-up-form__input"
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
      </div>
      <div class="sign-up-form__input-container">
        <div>
          <BaseInput
            v-model="form.password.value"
            class="sign-up-form__input"
            :class="{ invalid: !form.password.valid && form.password.touched }"
            placeholder="Пароль"
            :type="isPasswordShown ? `text` : 'password'"
            :isOpened="true"
            @blur="form.password.blur"
          />
          <OpenedEyeIcon
            v-if="isPasswordShown == false"
            @click="handlePasswordVisility"
          />
          <ClosedEyeIcon v-else @click="handlePasswordVisility" />
        </div>

        <div
          v-if="form.password.touched && form.password.errors.required"
          class="error-message"
        >
          Поле должно быть заполнено
        </div>
        <div
          v-else-if="form.password.touched && form.password.errors.minLength"
          class="error-message"
        >
          Минимальная длина 6 символов
        </div>
      </div>
    </div>
    <div class="sign-up-form__button-container">
      <BaseButton
        @click="submitForm"
        :isWhite="true"
        :size="'medium'"
        :disabled="!form.valid"
        :class="{ button_disabled: !form.valid }"
        >зарегистрироваться</BaseButton
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useForm } from "@/use/form";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import OpenedEyeIcon from "@/assets/icons/OpenedEyeIcon.vue";
import ClosedEyeIcon from "@/assets/icons/ClosedEyeIcon.vue";

// валидаторы
const required = (value) => !!value;
const minLength = (number) => (val) => val.length >= number;

// использование хука useForm для передачи
// хуку useField в дальнейшем и валидации полей
const form = useForm({
  username: {
    value: "",
    validators: { required },
  },
  email: {
    value: "",
    validators: { required },
  },
  password: {
    value: "",
    validators: { required, minLength: minLength(6) },
  },
});

// метод при нажатии кнопки submit
const submitForm = () => {
  console.log("Email: ", form.email.value);
  console.log("Password: ", form.password.value);
};

const isPasswordShown = ref(false);

const handlePasswordVisility = () => {
  isPasswordShown.value = !isPasswordShown.value;
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

.sign-up-form {
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
