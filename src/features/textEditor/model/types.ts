export interface EditorAction {
  type: string;
  icon?: {
    icon: string;
    size?: number;
  };
  text?: string;
  style?: Record<string, string | number>;
}
