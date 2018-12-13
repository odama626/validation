// declare namespace Core {


  export interface Validation {
    valid: boolean;
    message?: any;
  }
  type ValidateFunc = (value: any, values: any) => Promise<boolean | Validation> | boolean | Validation;
  type ValidationResult = Promise<Validation>
  export type ExtractProps<TComponentOrTProps> = TComponentOrTProps extends React.Component<infer TProps, any> ? TProps : TComponentOrTProps;
  export interface WrapperChildProps { 
    value: any;
    // name: string;
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
    // children: React.ReactElement<WrapperChildProps>;
    children: React.ReactElement<any>;
  }

  export interface WrapperProps extends FormFieldProps<null> {
    children?: (props: WrapperChildProps & { name?: string, error: boolean, message?: any}) => React.ReactElement<any>;
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
