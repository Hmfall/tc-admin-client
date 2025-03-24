import type { WidgetIconType } from '@/shared/constants/widgetIcons';

export interface MessageOptions {
  value: string;
  type?: WidgetIconType;
}

export type PushMessage = (options: MessageOptions) => void;
