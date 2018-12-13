import * as Core from './coreTypes';
import * as React from 'react';
/**
 * _@core / Form / Wrapper_
 *
 * ### Wrap a component that has value and onChange
 * ```
 * `
 * sets ${data-name} of component to track onChange
 * adds ${data-error} when there is an error with the input
 * `
 * ```
 * ### Accepted Props
 * ```
 * controller: Core.FormController // instance of FormController
 *
 * validate?: (value) => boolean // optional validation function
 *
 * name: string // the key the value will be under in the controller
 * ```
 */
export default class SimpleWrapper extends React.Component<Core.SimpleWrapperProps> implements Core.FormField {
    Context: React.Context<any>;
    validate(value: string, values: any): boolean | Promise<boolean>;
    componentWillMount(): void;
    render(): JSX.Element;
}
