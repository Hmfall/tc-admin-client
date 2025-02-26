import type { PushMessage } from '@/shared/components/messageAlert/model/types';
import { MessageType } from '@/shared/components/messageAlert/model/types';

export const useMessage = () => {
  const pushMessage = inject<PushMessage>('message', () => {
    throw new Error('Message is not injected!');
  });

  return {
    success: (value: string) => pushMessage({ value, type: MessageType.success }),
    warning: (value: string) => pushMessage({ value, type: MessageType.warning }),
    error: (value: string) => pushMessage({ value, type: MessageType.error }),
    info: (value: string) => pushMessage({ value, type: MessageType.info }),
  };
};
