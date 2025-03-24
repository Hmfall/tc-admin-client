import type { WidgetIconType } from '@/shared/constants/widgetIcons';

export interface BaseDialogProps {
  icon?: WidgetIconType;
  actions?: boolean;
  dialogWidth?: string | number;
  confirmButton?: string | boolean;
  closeIcon?: boolean;
  cancelButton?: string | boolean;
  persistentOnConfirm?: boolean;
  disabled?: boolean;
  persistent?: boolean;
  text?: string;
  compact?: boolean;
}
