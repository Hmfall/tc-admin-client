import type { VForm } from 'vuetify/components';

export const useForm = (
  options: { initial?: boolean; mode?: 'input' | 'lazy' } = {
    initial: false,
    mode: 'lazy',
  },
) => {
  const formRef = ref<VForm | null>(null);
  const isValid = ref<boolean>(options?.initial ?? false);
  const isDirty = ref(false);

  const validateOn = computed(() =>
    options.mode === 'lazy' ? (isDirty.value ? 'input' : 'lazy submit') : 'input',
  );

  const isFormValid = computed({
    get() {
      return isValid.value;
    },
    set(value: boolean | null) {
      if (options.mode === 'lazy' && !isDirty.value) {
        isValid.value = true;
      } else {
        isValid.value = value ?? false;
      }
    },
  });

  const validate = async () => {
    if (!formRef.value) {
      return;
    }

    const { valid } = await formRef.value.validate();

    isDirty.value = true;
    isFormValid.value = valid;

    return isFormValid.value;
  };

  const handleSubmit =
    <T>(cb: () => T) =>
    async () => {
      if (await validate()) {
        await cb();
      }
    };

  return {
    formRef,
    isFormValid,
    validate,
    handleSubmit,
    validateOn,
  };
};
