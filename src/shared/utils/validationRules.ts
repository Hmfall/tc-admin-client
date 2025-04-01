import plural from 'plural-ru';
import type { ObjectUrl } from '@/entities/objectURL/ObjectUrl';

export const requiredRule = (v: unknown) =>
  (v !== null && v !== undefined && v !== '') || 'Обязательно для заполнения';

export const minLengthRule = (v: string) =>
  v?.length >= 3 || 'Поле должно содержать минимум 3 символа';

export const minLengthValueRule = (length: number) => (v: string) =>
  v?.length >= length ||
  `Поле должно содержать минимум ${length} ${plural(length, 'символ', 'символа', 'символов')}`;

export const minLengthValueNotRequiredRule = (length: number) => (v?: string) => {
  if (!v) {
    return true;
  }

  return (
    v.length >= length ||
    `Поле должно содержать минимум ${length} ${plural(length, 'символ', 'символа', 'символов')}`
  );
};

export const requiredFileRule = (v: File[] | undefined) =>
  (v && v.length > 0) || 'Обязательно для заполнения';

export const requiredObjectUrlRule = (v: ObjectUrl | null) => {
  if (v?.url || v?.objectUrl) {
    return true;
  }

  return (v && (v?.file as unknown as File[])?.length > 0) || 'Обязательно для заполнения';
};

export const emailRules = [
  requiredRule,
  (v: string) => /.+@.+\..+/.test(v) || 'Введите валидный email',
];
