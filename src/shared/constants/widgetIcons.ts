export type WidgetIconType = 'success' | 'warning' | 'error' | 'info';

export const widgetIcons = new Map<WidgetIconType, string>([
  ['success', '$mdiCheckCircleOutline'],
  ['warning', '$mdiAlertCircleOutline'],
  ['error', '$mdiAlertCircleOutline'],
  ['info', '$mdiAlertCircleOutline'],
]);
