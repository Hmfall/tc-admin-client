import { useMemoize } from '@vueuse/core';

export const htmlToString = useMemoize((value?: string) => {
  const element = document.createElement('div');
  element.innerHTML = value ?? '';
  return element.textContent;
});
