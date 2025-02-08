export interface ConfirmArgs {
  content?: string;
  confirmText?: string;
  cancelText?: string;
}

export interface ConfirmInstance extends ConfirmArgs {
  id?: symbol;
  modelValue: boolean;
  resolve?: () => void;
  reject?: () => void;
}

export type ProvideConfirm = (args: ConfirmArgs) => Promise<void>;
