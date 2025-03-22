import { createGlobalState } from '@vueuse/core';

export const useAuthFormState = createGlobalState(() => {
  const credentials = ref('');

  const setCredentials = (value: string) => {
    credentials.value = value;
  };

  const resetCredentials = () => {
    credentials.value = '';
  };

  return { credentials, setCredentials, resetCredentials };
});
