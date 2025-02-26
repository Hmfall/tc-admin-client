export interface ConfirmOptions {
  content?: string;
  confirmText?: string;
  cancelText?: string;
}

export interface ConfirmInstance extends ConfirmOptions {
  id?: symbol;
  modelValue: boolean;
  resolve?: () => void;
  reject?: () => void;
}

export type PushConfirm = (options: ConfirmOptions) => Promise<void>;

export interface ConfirmResolve {
  isConfirmed: boolean;
}
