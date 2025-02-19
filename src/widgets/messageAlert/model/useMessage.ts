import type { PushMessage } from '@/widgets/messageAlert/model/types';
import { MessageType } from '@/widgets/messageAlert/model/types';

export const useMessage = () => {
  const pushMessage = inject<PushMessage>('message', () => {
    throw new Error('Message is not injected!');
  });

  return {
    showSuccessMessage: (value: string) => pushMessage({ value, type: MessageType.success }),
    showWarningMessage: (value: string) => pushMessage({ value, type: MessageType.warning }),
    showErrorMessage: (value: string) => pushMessage({ value, type: MessageType.error }),
    showInfoMessage: (value: string) => pushMessage({ value, type: MessageType.info }),
    showMessage: (value: string) => pushMessage({ value }),
  };
};
