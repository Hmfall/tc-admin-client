import type {
  ConfirmOptions,
  ConfirmResolve,
  PushConfirm,
} from '@/shared/components/confirmDialog/model/types';

export const useConfirm = () => {
  const pushConfirm = inject<PushConfirm>('confirm', () => {
    throw new Error('Confirm is not injected!');
  });

  return (options: ConfirmOptions = { icon: 'info' }) =>
    new Promise<ConfirmResolve>((resolve) =>
      pushConfirm(options)
        .then(() => resolve({ isConfirmed: true }))
        .catch((e) => e),
    );
};
