# @omarzion/validation

A simple validation library that uses React's context library.

It can be used to wrap around basic inputs as it is, but it is recommended to integrate it into stateless components.

Upon invoking the validate function the error state is remembered for each invalid input and retested on each change for that input until a valid state is reached in which case it the error state is removed.

Requires React ^16.4.2

inspired by [Flutter](https://flutter.io)


## 2.0 updates
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



## To install
```cli
npm install @omarzion/validation
```

## A simple use case
Use the SimpleWrapper, and it handle a lot for you, and you can write less code. It mostly only works on simple html elements though
```js
import { Controller, Form, SimpleWrapper } from '@omarzion/validation';

const controller = new Controller();

export default () => (
  <Form controller={controller}>
    <SimpleWrapper name='name' controller={controller} validate={value => value.length > 5}>
      <input placeholder='Name' />
    </SimpleWrapper>
    <SimpleWrapper name='password' controller={controller} validate={value => value.length > 5}>
      <input type='password' />
    </SimpleWrapper>
    <SimpleWrapper name='passwordRepeat' controller={controller} validate={(value, {password}) => value === password}>
      <input type='password' />
    </SimpleWrapper>
    <button onClick={() => {
      if (controller.validate()) {
        // make sure to always validate and only getValues when validate returns true
        // this keeps you from ever dealing with invalid data
        let values = controller.getValues();

        // do anything you want with your data
        // maybe a network request? maybe dispatch to redux here?
      }
    }}>Submit</button>
  </Form>
)
```

## More advanced use cases
Use the Wrapper component, it expects children to be a function and gives you full control of the interconnect
```js
import { Controller, Form, Wrapper } from '@omarzion/validation';

const controller = new Controller();

export default () => (
  <Form controller={controller}>
    <Wrapper name='custom' controller={controller} validate={value => true}>
      { ({value, onChange, error }) => <CustomComponent value={value} customAction={onChange} tip={error ? 'oops' : 'all good'} />}
    </Wrapper>
    <button onClick={() => {
      if (controller.validate()) {
        // make sure to always validate and only getValues when validate returns true
        // this keeps you from ever dealing with invalid data
        let values = controller.getValues();

        // do anything you want with your data
        // maybe a network request? maybe dispatch to redux here?
      }
    }}/>
  </Form>
)
```

## Shorthand
Validation is now easy, but there is so much typing.  There are a couple of helper functions that make things a little less verbose
```js
import { Controller, Form, SimpleWrapper, Wrap } from '@omarzion/validation';

const controller = new Controller();
const V = Wrap(controller); // <V> is now the same as <Wrapper controller={controller} />
const S = Wrap(controller, SimpleWrapper); // <S> is now <SimpleWrapper controller={controller} />

export default () => (
  <Form controller={controller}>
    <S name='name' validate={value => value.length > 5}>
      <input>
    </S>
    <S name='password' validate={value => value.length > 5}>
      <input type='password' />
    </S>
    <S name='passwordRepeat' validate={(value, {password}) => value === password}>
      <input type='password' />
    </S>
    <V name='custom' validate={value => true}>
      { ({value, onChange, error }) => <CustomComponent value={value} customAction={onChange} tip={error ? 'oops' : 'all good'} />}
    </V>
    <button onClick={() => {
      if (controller.validate()) {
        // make sure to always validate and only getValues when validate returns true
        // this keeps you from ever dealing with invalid data
        let values = controller.getValues();

        // do anything you want with your data
        // maybe a network request? maybe dispatch to redux here?
      }
    }}/>
  </Form>
)
```

## Tips
When using the controller it is recommeneded to only call `getValues()` after `validate()` returns true so you never have to deal with invalid input
```js
if (controller.validate()) {
  let formData = controller.getValues();
}
```

# Api

## Controller
The controller is the glue of the entire validation library.  Every "Form" or group of inputs that are part of the same data entry group should use the same controller.  After instantiating it you just need to pass it to the form and each input within that form.
```js
import { Controller } from '@omarzion/validation';

const controller = new Controller();

// test validation on all connected elements
// returns true if all of them are valid
// otherwise returns false and sets the error state on all the bad values
if (controller.validate()) {
  // get an object of all the connected elements in the form
  // name: value
  let formData = controller.getValues();
}



```

## Form
The form is the Provider, it should contain all of the validated elements.
```js
import { Form, Controller } from '@omarzion/validation';


const controller = new Controller();

export default () => (
  <Form controller={controller}>
  </Form>
)
```

## SimpleWrapper
A very basic wrapper component that is good for wrapping simple elements that have value and onChange.
data-name is used for tracking the element name and data-error is used for tracking errors.  to style the error state on your wrapped element use the css selector `[data-error]`
```css
// style.css
.textArea {
}

.textArea[data-error] {
  border-color: red; 
}
```

```js
// myForm.js
import { Form, Controller, SimpleWrapper } from '@omarzion/validation';


const controller = new Controller();

export default () => (
  <Form controller={controller}>
    <SimpleWrapper name='text' controller={controller} validate={value => value.length > 10}>
      <input />
    </SimpleWrapper>
  </Form>
)
```

## Wrapper
A more generic wrapper, designed in such a way that it should be able to handle any kind of validation you can throw at it
```js
import { Form, Controller, Wrapper } from '@omarzion/validation';


const controller = new Controller();

export default () => (
  <Form controller={controller}>
    <Wrapper name='text' controller={controller} validate={value => value.length > 10}>
      { ({value, onChange, error}) => (
        <input value={value} onChange={e => onChange(e.target.value)} className={`input ${ error ? 'error' : ''}`} />
      )}
    </Wrapper>
  </Form>
)
```