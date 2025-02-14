import type { Component } from 'vue';
import type { VFileInput, VRow, VTextarea, VTextField } from 'vuetify/components';

export interface CommonFormBuilderField<T> {
  key: keyof T;
  render: () => Component | VNode | string;
}

export type FileInputField<T> = /* @vue-ignore */ InstanceType<typeof VFileInput>['$props'] & {
  foreignKey?: keyof T;
};

export type FormBuilderFieldInput<T> =
  | {
      type: Input.textField;
      props?: InstanceType<typeof VTextField>['$props'];
    }
  | {
      type: Input.textarea;
      props?: InstanceType<typeof VTextarea>['$props'];
    }
  | {
      type: Input.fileInput;
      props?: FileInputField<T>;
    };

export type FormBuilderField<T> = FormBuilderFieldInput<T> & CommonFormBuilderField<T>;

export interface FormBuilderColArgs<T> {
  span: number;
  items: FormBuilderField<T>[];
}

export interface FormBuilderColOptions {
  justify?: VRow['justify'];
}

export type FormBuilderFieldsRow<T> = (FormBuilderColArgs<T> | FormBuilderColOptions)[];

export type FormBuilderFields<T> = FormBuilderFieldsRow<T>[] | FormBuilderField<T>[];

export type FormEditMode = 'update' | 'create';

export type SubmitOperation = FormEditMode | 'delete';

export interface UpdateFormFieldValue<T> {
  key: keyof T;
  value: any;
}

export type UpdateFormFieldPromise<T> = () => Promise<UpdateFormFieldValue<T>>;

export enum Input {
  textField = 'textField',
  textarea = 'textarea',
  fileInput = 'fileInput',
}