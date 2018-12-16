import * as Core from './coreTypes';
import React from 'react';
import Controller from './controller';
import Form from './form';
import { Wrap } from './wrapper';

export default function(register?) {
  return function(WrappedComponent: React.ComponentType<any>) {
    return class extends React.Component<Core.ExtractProps<typeof WrappedComponent> & { controller: Core.FormController}> {
      controller: Core.FormController;
      validators: any;
      constructor(props) {
        super(props);
        this.controller = new Controller()
        this.validators = {};

        if (register) {
          this.validators = register(validator(this.controller))
        }
      }
      render() {
        return (
          <Form controller={this.controller}>
            <WrappedComponent {...this.props} {...this.validators} controller={this.controller} />
          </Form>
        )
      }
    }
  }
}

export function validator(controller: Core.FormController) {
  return (wrappedComponent: React.ComponentType<Core.FormFieldProps<null>>, validator?: Core.ValidateFunc) => {
      return Wrap(controller, wrappedComponent, validator);
  }
}