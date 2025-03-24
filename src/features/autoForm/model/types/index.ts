import type { VFileInput, VRow, VSelect, VSwitch, VTextarea, VTextField } from 'vuetify/components';

export interface AutoFormCommonField<T> {
  key: keyof T;
  render: () => Component | VNode;
}

export type FileInputField = /* @vue-ignore */ InstanceType<typeof VFileInput>['$props'] & {
  accept?: string[];
};

export type SelectField = /* @vue-ignore */ InstanceType<typeof VSelect>['$props'];

export type EditedTextField = {
  label?: string;
  rows?: string | number;
  rules?: ((v: any) => any)[];
};

export type AutoFormFieldInput =
  | {
      type: FieldType.textField;
      props?: InstanceType<typeof VTextField>['$props'];
    }
  | {
      type: FieldType.select;
      props?: SelectField;
    }
  | {
      type: FieldType.switch;
      props?: InstanceType<typeof VSwitch>['$props'];
    }
  | {
      type: FieldType.editedTextField;
      props?: EditedTextField;
    }
  | {
      type: FieldType.textarea;
      props?: InstanceType<typeof VTextarea>['$props'];
    }
  | {
      type: FieldType.fileInput;
      props?: FileInputField;
    };

export interface AutoFormColBreakpoint {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export type AutoFormField<T> = AutoFormFieldInput &
  AutoFormCommonField<T> & {
    span?: AutoFormColBreakpoint;
    order?: AutoFormColBreakpoint;
  };

export interface AutoFormColCommonOptions {
  justify?: VRow['justify'];
}

export interface AutoFormColOptions<T> {
  span: number | AutoFormColBreakpoint;
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

export type UpdateAutoFormFieldPromiseMappedKey<T> = {
  key: UpdateAutoFormFieldValue<T>['key'];
  fn: UpdateAutoFormFieldPromise<T>;
};

export type AutoFormItemsMap<T> = Map<
  UUID,
  {
    item: T;
    promises: UpdateAutoFormFieldPromise<T>[];
  }
>;

export enum FieldType {
  textField = 'textField',
  select = 'select',
  switch = 'switch',
  editedTextField = 'editedTextField',
  textarea = 'textarea',
  fileInput = 'fileInput',
}
