import type {
  ConfirmInternalOptions,
  ConfirmResolve,
  PushConfirm,
} from '@/shared/components/confirmDialog/model/types';

export const useConfirmDialog = () => {
  const pushConfirm = inject<PushConfirm>('confirm', () => {
    throw new Error('Confirm is not injected!');
  });

  return (
    content?: ConfirmInternalOptions['content'],
    confirmText?: ConfirmInternalOptions['confirmText'],
    cancelText?: ConfirmInternalOptions['cancelText'],
  ) =>
    new Promise<ConfirmResolve>((resolve) =>
      pushConfirm({ content, confirmText, cancelText })
        .then(() => resolve({ isConfirmed: true }))
        .catch((e) => e),
    );
};
