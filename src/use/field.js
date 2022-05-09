import { ref, reactive, watch } from "vue";

const not = (value) => !value;

export function useField(field) {
  // общая валидность поля на основе всех валидаторов
  const valid = ref(true);
  // value поля
  const value = ref(field.value);
  // терял ли хоть раз инпут свой фокус
  const touched = ref(false);
  // объект ошибок поля на основе всех валидаторов
  const errors = reactive({});

  // валидация поля
  const reassign = (value) => {
    // если нет валидаторов = поле валидно по дефолту
    valid.value = true;
    // перебор валидаторов и генерация ошибок
    Object.keys(field.validators ?? {}).map((name) => {
      const isValid = field.validators[name](value);
      errors[name] = not(isValid);
      if (not(isValid)) {
        valid.value = false;
      }
    });
  };

  // вызов валидации на основе реактивного изменения value
  watch(value, reassign);
  reassign(field.value);

  return { value, valid, errors, touched, blur: () => (touched.value = true) };
}
