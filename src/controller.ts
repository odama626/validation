import { createContext } from 'react';



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

  validateByName(name) {
    let values = this.provider.state.values;
    let component = this.components[name];
    return component.validate ? component.validate(values[name], values) : true;
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
  validate(): boolean {
    if (!this.provider || !this.provider.state) {
      throw new Error('FormController requires a provider, did you forget to set controller on your Form?');
    }
    const { values } = this.provider.state;
    let invalid: any = {};
    let valid = Object.keys(this.components).reduce((valid, key) => {
      let c = this.components[key];
      let v = c.validate ? c.validate(values[key], values) : true;
      invalid[key] = !v;
      return valid && v;
    }, true);

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