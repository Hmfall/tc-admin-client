export const validationRules = {
  required: (v: any) => (v !== null && v !== undefined && v !== '') || 'Обязательно для заполнения',
  notNull: (v: any) => !!v || 'Некорректное значение',
};
