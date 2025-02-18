export const requiredRule = (v: string) =>
  (v !== null && v !== undefined && v !== '') || 'Обязательно для заполнения';

export const notNullRule = (v: any) => !!v || 'Некорректное значение.';

export const emailRules = [
  requiredRule,
  (v: string) => /.+@.+\..+/.test(v) || 'Введите валидный email.',
];
