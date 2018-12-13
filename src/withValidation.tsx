import * as Core from './coreTypes';
import React from 'react';
import Controller from './controller';

export default function(controllerName) {
  return function(WrappedComponent) {
    return class extends React.Component {
      controller: { [name: string]: Core.FormController };
      constructor(props) {
        super(props);
        this.controller = {
          [controllerName]: new Controller()
        }
      }
      render() {
        return <WrappedComponent {...this.props} {...this.controller} />
      }
    }
  }
}