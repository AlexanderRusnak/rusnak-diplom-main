<template>
  <div class="sign-up-form">
    <pre>{{ form.email }}</pre>
    <pre>{{ form.password }}</pre>
    <div class="sign-up-form__inputs">
      <div class="sign-up-form__input-container">
        <BaseInput
          v-model="form.email.value"
          class="sign-up-form__input"
          :class="{ invalid: !form.email.valid && form.email.touched }"
          placeholder="Email"
          type="email"
          @blur="form.email.blur"
        />
        <small v-if="form.email.touched && form.email.errors.required">
          Email field is required
        </small>
        <BaseInput
          v-model="form.password.value"
          class="sign-up-form__input"
          :class="{ invalid: !form.password.valid && form.password.touched }"
          placeholder="Пароль"
          type="password"
          @blur="form.password.blur"
        />
        <small v-if="form.password.touched && form.password.errors.required"
          >Password field is required
        </small>
        <small
          v-else-if="form.password.touched && form.password.errors.minLength"
        >
          Password length can't be less than 8. Now it is
          {{ form.password.value.length }}
        </small>
      </div>
    </div>
    <div class="sign-up__button-container">
      <BaseButton @click="submitForm" :disabled="!form.valid"
        >зарегистрироваться</BaseButton
      >
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/components/base/BaseInput.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import { useForm } from "@/use/form";

const required = (value) => !!value;
const minLength = (number) => (val) => val.length >= number;

const form = useForm({
  email: {
    value: "",
    validators: { required },
  },
  password: {
    value: "",
    validators: { required, minLength: minLength(8) },
  },
});

const submitForm = () => {
  console.log("Email: ", form.email.value);
  console.log("Password: ", form.password.value);
};
</script>

<style lang="scss" scoped>
.invalid {
  border: 2px solid red;
  outline: none;
}
</style>
