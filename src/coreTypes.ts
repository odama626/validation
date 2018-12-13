// declare namespace Core {

  type ValidateFunc = (value: any, values: any) => boolean;
  type ValidationResult = Promise<{ valid: boolean; message?: any }>
  export interface WrapperChildProps { 
    value: any;
    name: string;
    onChange: (event) => any;
  }

  export interface FormController {
    attachComponent: (name, conmponent) => void;
    attachContext: (conmponent) => void;
    validate: () => ValidationResult;
    validateByName: (name: string, values: { [name: string]: any }) => ValidationResult;
    set: (name: string, opts: { value?: any, message?: any, valid?: boolean}) => void;
    get: (name: string) => { value: any, valid: boolean, message?: any };
  }

  export interface FormField {
    validate?: ValidateFunc
    Context: React.Context<FormProviderContext>;
  }

  export interface FormProviderContext {
    errors: {
      [name: string]: boolean;
    };
    values: {
      [name: string]: any;
    }
    onChange: (event) => void;
  }


  export interface Provider extends React.Component<any, any> {
    onChange: (event: React.SyntheticEvent<any>) => void;
    update: (errorFields: { [name: string]: any}) => void;
    context: React.Context<FormProviderContext>;
  }


  // React Component Prop Types

  export interface FormFieldProps<T> extends React.HTMLProps<T> {
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

  export interface FormProps extends React.HTMLProps<HTMLDivElement> {
    controller: FormController;
  }

  // Themes
  // export interface Theme {
  //   primary: string;
  //   secondary: string;
  //   success: string;
  //   info: string;
  //   warning: string;
  //   danger: string;
  //   light: string;
  //   dark: string;
  // }
// }
