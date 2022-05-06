import { computed, reactive } from "vue";
import { useField } from "@/use/field";

export function useForm(init = {}) {
  const form = reactive({});
  const validKey = "valid";

  for (const [key, value] of Object.entries(init)) {
    form[key] = useField(value);
  }

  const withoutValid = (key) => key !== validKey;

  form[validKey] = computed(() => {
    return Object.keys(form)
      .filter(withoutValid)
      .reduce((accumulator, key) => {
        accumulator = form[key].valid;
        return accumulator;
      }, true);
  });

  return form;
}
