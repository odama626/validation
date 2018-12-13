import * as Core from './coreTypes';
import * as React from 'react';

export default class Form extends React.Component<Core.FormProps, any> implements Core.Provider {
  Context;
  constructor(props) {
    super(props);
    this.state = {
      onChange: this.onChange.bind(this),
      values: {},
      errors: {},
    };
    this.props.controller.attachContext(this);
  }

  async onChange(event, directName?: string) {
    const { values, errors } = this.state;
    let name = directName || event.target.dataset.name;
    let value = directName ? event : maybe('target.value', event);
    let nextState = {
      values: { ...values, [name]: value },
    }
    if (errors[name] && !errors[name].valid) {
      let result = await this.props.controller.validateByName(name, nextState.values);
      nextState['errors'] = { ...errors, [name]: result };
    }
    this.setState(nextState);
  }

  update(errors) {
    this.setState({ errors });
  }

  render() {
    const { controller, ...rest } = this.props;
    const { Context } = this;
    return (
      <Context.Provider value={this.state}>
        <div {...rest} />
      </Context.Provider>
    )
  }
}

function maybe(path: ((string | number)[]) | string, obj: any) {
  let p = typeof path === 'string' ? path.split('.') : path;
  return p.reduce((result, next) => result && result[next] !== 'undefined' ? result[next] : undefined, obj);
}