import type { BaseDialogProps } from '@/shared/ui/baseDialog/model/types';

export interface ConfirmOptions {
  message?: string;
  confirmBtn?: string;
  cancelBtn?: string;
  icon?: BaseDialogProps['icon'];
}

export interface ConfirmInstance extends ConfirmOptions {
  id?: symbol;
  modelValue: boolean;
  resolve?: () => void;
  reject?: () => void;
}

export type PushConfirm = (options?: ConfirmOptions) => Promise<void>;

export interface ConfirmResolve {
  isConfirmed: boolean;
}
