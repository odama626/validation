declare namespace Core {

  type ValidateFunc = (value: any, values: any) => boolean;
  type ValidationResult = Promise<{ valid: boolean; message?: any }>
  interface WrapperChildProps { 
    value: any;
    name: string;
    onChange: (event) => any;
  }

  interface FormController {
    attachComponent: (name, conmponent) => void;
    attachContext: (conmponent) => void;
    validate: () => ValidationResult;
    validateByName: (name: string, values: { [name: string]: any }) => ValidationResult;
    // set: (name: string, values?: { valid?: boolean, message?: any, value?: any}) => boolean;
  }

  interface FormField {
    validate?: ValidateFunc
    Context: React.Context<FormProviderContext>;
  }

  interface FormProviderContext {
    errors: {
      [name: string]: boolean;
    };
    values: {
      [name: string]: any;
    }
    onChange: (event) => void;
  }


  interface Provider extends React.Component<any, any> {
    onChange: (event: React.SyntheticEvent<any>) => void;
    update: (errorFields: { [name: string]: any}) => void;
    context: React.Context<FormProviderContext>;
  }


  // React Component Prop Types

  interface FormFieldProps<T> extends React.HTMLProps<T> {
    validate?: ValidateFunc
    controller?: FormController;
    name: string;
  }

  export interface SimpleWrapperProps extends FormFieldProps<null> {
    children: React.ReactElement<WrapperChildProps>;
  }

  export interface WrapperProps extends FormFieldProps<null> {
    children: (props: WrapperChildProps & { error: boolean, message?: any}) => React.ReactNode;
  }

  interface FormProps extends React.HTMLProps<HTMLDivElement> {
    controller: FormController;
  }

  // Themes
  interface Theme {
    primary: string;
    secondary: string;
    success: string;
    info: string;
    warning: string;
    danger: string;
    light: string;
    dark: string;
  }
}
