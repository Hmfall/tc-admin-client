import type { ConfirmArgs, ProvideConfirm } from '@/widgets/confirmDialog/types';

export const useConfirmDialog = () => {
  const provideConfirm = inject<ProvideConfirm>('confirm', () => {
    throw new Error('Confirm is not injected!');
  });

  return (
    content?: ConfirmArgs['content'],
    confirmText?: ConfirmArgs['confirmText'],
    cancelText?: ConfirmArgs['cancelText'],
  ) =>
    new Promise<{ isConfirmed: boolean }>((resolve) =>
      provideConfirm({ content, confirmText, cancelText })
        .then(() => resolve({ isConfirmed: true }))
        .catch((e) => e),
    );
};
