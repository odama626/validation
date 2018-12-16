import * as Core from './coreTypes';
import * as React from 'react';
export default class Form extends React.Component<Core.FormProps, any> implements Core.Provider {
    Context: any;
    constructor(props: any);
    onChange(event: any, directName?: string): void;
    update(errors: any): void;
    render(): JSX.Element;
}
