import type { VForm } from 'vuetify/components';

export function useForm(options?: { isFormValid: boolean }) {
  const formRef = ref<VForm | null>(null);
  const isFormValid = ref(options?.isFormValid ?? false);
  const isDirty = ref(false);

  const validateOn = computed(() => (isDirty.value ? 'input' : 'lazy submit'));

  const validate = async () => {
    if (!formRef.value) {
      return;
    }

    const { valid } = await formRef.value.validate();

    isDirty.value = true;
    isFormValid.value = valid;

    return isFormValid.value;
  };

  const onSubmit = (cb: () => Promise<void>) => async () => {
    if (await validate()) {
      await cb();
    }
  };

  return {
    formRef,
    validate,
    validateOn,
    onSubmit,
  };
}
