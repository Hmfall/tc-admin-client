export type FormEditMode = 'update' | 'create';

export interface UpdateFormFieldValue<T> {
  key: keyof T;
  value: any;
}

export type UpdateFormFieldPromise<T> = FunctionExpression<Promise<UpdateFormFieldValue<T>>>;
