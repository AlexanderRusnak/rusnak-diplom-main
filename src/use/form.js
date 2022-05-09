import { computed, reactive } from "vue";
import { useField } from "@/use/field";

export function useForm(init = {}) {
  // создание пустого объекта формы
  const form = reactive({});

  // создание константы, которая потом станет свойством
  // объкта формы и будет означать общую валидацию формы
  const validKey = "valid";

  // валидация каждого поля формы
  for (const [key, value] of Object.entries(init)) {
    form[key] = useField(value);
  }

  // функция проверки невалидного значения (которые уже рассчитаны)
  const withoutValid = (key) => key !== validKey;

  // проверка каждого инпута формы на валидность и общая валидация формы
  form[validKey] = computed(() => {
    return Object.keys(form)
      .filter(withoutValid)
      .reduce((accumulator, key) => {
        // условие чтобы при наличии 1 ошибки форма уже не была валидной
        if (accumulator) {
          accumulator = form[key].valid;
        }

        return accumulator;
      }, true);
  });

  return form;
}
