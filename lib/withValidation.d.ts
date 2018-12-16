import * as Core from './coreTypes';
import React from 'react';
export default function (register?: any): (WrappedComponent: React.ComponentType<any>) => {
    new (props: any): {
        controller: Core.FormController;
        validators: any;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<any>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<any>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
};
export declare function validator(controller: Core.FormController): (wrappedComponent: React.ComponentType<Core.FormFieldProps<null>>, validator?: Core.ValidateFunc | undefined) => (props: Core.FormFieldProps<null>) => JSX.Element;
