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

        <BaseInputError
          v-if="form.username.touched && form.username.errors.required"
        >
          Поле должно быть заполнено
        </BaseInputError>

        <BaseInputError
          v-else-if="form.username.touched && form.username.errors.minLength"
        >
          Минимальная длина 6 символов
        </BaseInputError>
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

        <BaseInputError v-if="form.email.touched && form.email.errors.required">
          Поле должно быть заполнено
        </BaseInputError>

        <BaseInputError
          v-else-if="form.email.touched && form.email.errors.isEmail"
        >
          Введите корректный email
        </BaseInputError>
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

        <BaseInputError
          v-if="form.password.touched && form.password.errors.required"
        >
          Поле должно быть заполнено
        </BaseInputError>

        <BaseInputError
          v-else-if="form.password.touched && form.password.errors.minLength"
        >
          Минимальная длина 6 символов
        </BaseInputError>
      </div>
    </div>
    <div class="sign-up-form__button-container">
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
import { ref } from "vue";
import { useForm } from "@/use/form";
import { useRouter } from "vue-router";
import FirebaseService from "@/services/FirebaseService";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseInputError from "@/components/base/BaseInputError.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import OpenedEyeIcon from "@/assets/icons/OpenedEyeIcon.vue";
import ClosedEyeIcon from "@/assets/icons/ClosedEyeIcon.vue";

// роутер
const router = useRouter();

// валидаторы
const required = (value) => !!value;
const minLength = (number) => (val) => val.length >= number;
const isEmail = (value) => {
  const regexp =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

  return regexp.test(value);
};

// использование хука useForm для передачи
// хуку useField в дальнейшем и валидации полей
const form = useForm({
  username: {
    value: "",
    validators: { required, minLength: minLength(6) },
  },
  email: {
    value: "",
    validators: { required, isEmail },
  },
  password: {
    value: "",
    validators: { required, minLength: minLength(6) },
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

// метод при нажатии кнопки submit
const submitForm = () => {
  FirebaseService.doCreateUserWithEmailAndPassword(
    form.email.value,
    form.password.value
  )
    .then(() => {
      cleanForm();
      router.push("/");
    })
    .catch((error) => {
      console.log(error);
    });
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
