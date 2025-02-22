import type { ConfirmOptions, PushConfirm } from '@/shared/components/confirmDialog/model/types';

export const useConfirmDialog = () => {
  const pushConfirm = inject<PushConfirm>('confirm', () => {
    throw new Error('Confirm is not injected!');
  });

  return (
    content?: ConfirmOptions['content'],
    confirmText?: ConfirmOptions['confirmText'],
    cancelText?: ConfirmOptions['cancelText'],
  ) =>
    new Promise<{ isConfirmed: boolean }>((resolve) =>
      pushConfirm({ content, confirmText, cancelText })
        .then(() => resolve({ isConfirmed: true }))
        .catch((e) => e),
    );
};
