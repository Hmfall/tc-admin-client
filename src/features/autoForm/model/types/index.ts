import type { VFileInput, VRow, VTextarea, VTextField } from 'vuetify/components';

export interface AutoFormCommonField<T> {
  key: keyof T;
  render: () => Component | VNode | string;
}

export type FileInputField = /* @vue-ignore */ InstanceType<typeof VFileInput>['$props'] & {
  accept?: string[];
};

export type AutoFormFieldInput =
  | {
      type: FieldType.textField;
      props?: InstanceType<typeof VTextField>['$props'];
    }
  | {
      type: FieldType.textarea;
      props?: InstanceType<typeof VTextarea>['$props'];
    }
  | {
      type: FieldType.fileInput;
      props?: FileInputField;
    };

export type AutoFormField<T> = AutoFormFieldInput & AutoFormCommonField<T>;

export interface AutoFormColCommonOptions {
  justify?: VRow['justify'];
}

export interface AutoFormColOptions<T> {
  span: number;
  items: AutoFormField<T>[];
}

export type AutoFormRow<T> = (AutoFormColCommonOptions | AutoFormColOptions<T>)[];

export type AutoFormFields<T> = AutoFormRow<T>[] | AutoFormField<T>[];

export type FormEditMode = 'update' | 'create';

export type AutoFormSubmitOperation = FormEditMode | 'delete';

export interface UpdateAutoFormFieldValue<T> {
  key: keyof T;
  value: any;
}

export type UpdateAutoFormFieldPromise<T> = () => Promise<UpdateAutoFormFieldValue<T>>;

export enum FieldType {
  textField = 'textField',
  textarea = 'textarea',
  fileInput = 'fileInput',
}
