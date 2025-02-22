export enum MessageType {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info',
}

export interface MessageOptions {
  value: string;
  type?: MessageType;
}

export type PushMessage = (options: MessageOptions) => void;
