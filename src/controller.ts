import * as Core from './coreTypes';
import { createContext } from 'react';
declare var Promise;



/**
 * _@core / Form / Controller_
 *
 * ### Control FormFields in a Form and handle validation
 * ```
 * `
 * Pass an instance of ${ Controller } into a ${ Form } and
 * it's ${ children FormFields } to manage input ${ updates }
 * and ${ validation } checks
 * `
 *```
 *
 */

async function testValidity(test, name, values) {
  let result = await (test ? Promise.resolve(test(values[name], values)) : Promise.resolve(true));

  if (result.message || result.valid) {
    return result;
  }
  return { valid: result };
}

export default class Controller implements Core.FormController {
  components: { [name: string]: Core.FormField };
  Context: React.Context<Core.FormProviderContext>;
  provider: Core.Provider;

  constructor() {
    this.components = {};
    this.Context = createContext({
      errors: {},
      values: {},
      onChange: e => e
    });
  }

  attachContext(provider) {
    provider.Context = this.Context;
    this.provider = provider;
  }

  attachComponent(name, component) {
    this.components[name] = component;
    component.Context = this.Context;
  }

  async validateByName(name, values) {
    let component = this.components[name];
    return testValidity(component.validate, name, values);
    //return component.validate ? await Promise.resolve(component.validate(values[name], values)) : Promise.resolve(true);
  }

  set(name, opts: any) {
    if (!this.provider || !this.provider.state) throw new Error('FormController requires a provider');
    let state = {...this.provider.state};
    state.values[name] = 'value' in opts ? opts.value : state.values[name];
    const { value, ...rest } = opts;
    state.errors[name] = 'valid' in rest || 'message' in rest ? rest : state.errors[name];
    this.provider.setState(state);
  }

  get(name: string) {
    const state = this.provider.state;
    return {
      value: state.values[name],
      valid: state.errors[name] ? state.errors[name].valid : true,
      message: state.errors[name] ? state.errors[name].message : undefined
    }
  }

  /**
   * ```
   * `
   * runs ${ validate } on all connected ${ FormFields }
   * inside containing ${ Form }
   * 
   * marks all ${ FormFields } invalid that return falsey
   * from ${ validate } function
   * 
   * returns ${ true } if all ${ FormFields } pass validation
   * `
   * ```
   * example:
   * ```
   * if (controller.validate()) {
   *   // Form is valid, grab form data
   *   let data = controller.getValues();
   * } else {
   *  // show error message here
   * }
   * ```
   */
  async validate() {
    if (!this.provider || !this.provider.state) {
      throw new Error('FormController requires a provider, did you forget to set controller on your Form?');
    }
    const { values } = this.provider.state;
    let invalid: any = {};
    // let valid = Object.keys(this.components).reduce((valid, key) => {
    //   let c = this.components[key];
    //   let v = c.validate ? c.validate(values[key], values) : true;
    //   invalid[key] = !v;
    //   return valid && v;
    // }, true);

    let valids = await Promise.all(Object.keys(this.components).map(async key => {
      // let c = this.components[key];
      // let v = await (c.validate ? Promise.resolve(c.validate(values[key], values)) : Promise.resolve(true));
      let v = await testValidity(this.components[key].validate, key, values);
      invalid[key] = v;
      return v;
    }));

    let valid = valids.reduce((valid, next) => valid && next.valid, true);
    

    if (typeof valid === 'undefined')
      return true;
    this.provider.update(invalid);
    return valid;
  }
  
  /**
   * ```
   * `
   * Get values from all connected ${ FormFields }
   * 
   * returns ${ key value pairs } where the key is
   * the ${ FormField name } and the value is it's value
   * `
   * ```
   */
  getValues(): { [name: string]: any } {
    return this.provider.state.values;
  }
}