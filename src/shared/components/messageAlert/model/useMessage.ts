import type { PushMessage } from '@/shared/components/messageAlert/model/types';

export const useMessage = () => {
  const pushMessage = inject<PushMessage>('message', () => {
    throw new Error('Message is not injected!');
  });

  return {
    success: (value: string) => pushMessage({ value, type: 'success' }),
    warning: (value: string) => pushMessage({ value, type: 'warning' }),
    error: (value?: string) => pushMessage({ value: value ?? 'Произошла ошибка!', type: 'error' }),
    info: (value: string) => pushMessage({ value, type: 'info' }),
  };
};
