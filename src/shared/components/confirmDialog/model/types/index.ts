import type { useConfirmDialog } from '@/shared/components/confirmDialog/model/useConfirmDialog';

export interface ConfirmInternalOptions {
  content?: string;
  confirmText?: string;
  cancelText?: string;
}

export type ConfirmOptions = Parameters<ReturnType<typeof useConfirmDialog>>;

export interface ConfirmInstance extends ConfirmInternalOptions {
  id?: symbol;
  modelValue: boolean;
  resolve?: () => void;
  reject?: () => void;
}

export type PushConfirm = (options: ConfirmInternalOptions) => Promise<void>;

export interface ConfirmResolve {
  isConfirmed: boolean;
}
