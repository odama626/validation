/// <reference types="react" />
export default class Controller implements Core.FormController {
    components: {
        [name: string]: Core.FormField;
    };
    Context: React.Context<Core.FormProviderContext>;
    provider: Core.Provider;
    constructor();
    attachContext(provider: any): void;
    attachComponent(name: any, component: any): void;
    validateByName(name: any, values: any): Promise<any>;
    set(name: any, opts: any): void;
    get(name: string): {
        value: any;
        valid: any;
        message: any;
    };
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
    validate(): Promise<any>;
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
    getValues(): {
        [name: string]: any;
    };
}
