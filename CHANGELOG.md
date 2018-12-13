# 2.0.2
* __BUG FIX:__ Typescript types should now be properly exported

# 2.0.1
Controller now has two extra functions that can be used

## set
You can now set the valid state of an input (useful for logging in when username and password don't match etc)
```js
controller.set(
  'name', // the name of the input field
  {
    value: 'test', // optionally set the value
    message: 'testing message', // optionally set the message
    valid: 'false' // optionally set it as valid or not
  }
);
```
## get
Added simply to be the opposite of set, you give it a name and get back value, message and valid
```ts
let info = controller.get('name')
/** info:
 * value
 * message
 * valid
 */
```

# 2.0
* __NEW FEATURE:__ The Library has been rewritten to work with async await
* __BREAKING CHANGE:__ `controller.validate` now returns a promise
```js
onClick={async () => {
  if (await controller.validate()) {
    controller.getValues();
  }
}}
```
* __NEW FEATURE:__ You can now optionally return a message when your validate function fails and it will be passed to your wrapped element
```js
const validateWithMessage = async (value = '') => {
  if (value.length < 1) {
    return { valid: false, message: 'This field is required' };
  }
  if (value.toLowerCase() === value || value.toUpperCase() === value) {
    return { valid: false, message: 'This field needs a mixture of uppercase and lowercase letters' };
  }

  // things are valid
  return true;
}


// you can still simply return true or false
// if you don't want a message
const validateWithoutMessage = async (value = '') => (
  value.length > 0
  && value.toLowerCase() !== value
  && value.toUpperCase() !== value;
);
```
* __BREAKING CHANGE:__ if you only use `Wrapper` `SimpleWrapper` and `Wrap` they are backwards compatible and you can ignore this. However, if you implemented the undocumented Core.FormFieldProps or Core.FormField types in your own code you will have to rewrite your integrations and it is suggested to only use Wrapper or Simple wrapper in your components in the future.