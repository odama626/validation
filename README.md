# @omarzion/validation

A simple validation library that uses React's context library.

It can be used to wrap around basic inputs as it is, but it is recommended to integrate it into stateless components.

Upon invoking the validate function the error state is remembered for each invalid input and retested on each change for that input until a valid state is reached in which case it the error state is removed.

Requires React ^16.4.2

for old documentation see [version 2 docs](README.old.md)

For basic usage

```jsx
import withValidation, { Wrapper } from '@omarzion/validation';


const submit = async controller => {
  // this is where the magic happens
  // if validation fails it fires up all the error messages
  // and adds listeners to all the bad inputs and revalidates them
  // on each change until they pass
  if (await controller.validate()) {
    // if validate() returns true, everything is valid

    // getValues() returns an object with all your form inputs in key value form
    const formData = controller.getValues();

    // do whatever with your clean form data here
  }
}

// withValidation provides controller prop
const ValidatedForm = ({ controller, Wrap, Long }) => (
  <div>
    <Wrap name='name' controller={controller} validate={v => v.length > 0}>
      ({ onChange, value, error, message }) => (
        <input
          style={{ borderColor: error ? 'red' : 'initial' }}
          onChange={onChange}
          value={value}
        />
      )
    </Wrap>
    <button onClick={() => submit(controller)} />
  </div>
)

export default withValidation()(ValidatedForm);
```
You can also map the controller (and optionably a validation function) and provide it to the withValidation function

```jsx
import withValidation, { Wrapper } from '@omarzion/validation';


const submit = async controller => {
  if (await controller.validate()) {
    const formData = controller.getValues();
    // do whatever with your clean form data here
  }
}

// withValidation provides controller prop, and all registered validators
const ValidatedForm = ({ controller, Wrap, Long }) => (
  <div>
    <Wrap name='name' validate={v => v.length > 0}>
      ({ onChange, value, error, message }) => (
        <input
          style={{ borderColor: error ? 'red' : 'initial' }}
          onChange={onChange}
          value={value}
        />
      )
    </Wrap>
    <button onClick={() => submit(controller)} />
  </div>
)

const mapControllerToFields = register => {
  return {
    Wrap: register(Wrapper),

    // make a validator that requires a string at least 10 characters long
    Long: register(Wrapper, input => input.length > 9)
  }
}

export default withValidation(mapControllerToFields)(ValidatedForm);
```

# Wrapper
primary primitive for wrapping components that need validated


```ts
interface Wrapper {
  name: string; // this will be the key returned by controller
  // value of current input
  // formValues = object of all inputs in current form
  validate: (value, formValues) => {
    boolean // validate should return whether input is valid
    || { valid: boolean, message: string} // can return message for errors
  }
  children: (ChildrenArguments) => React Element
}

interface ChildrenArguments {
   onChange
   value
   error: boolean; // is there currently an error?
   message: string; //error message or null
}
```

# Controller
This is where all the magic happens, it handles:
- when validation should be ran
- when error messages should be shown
- getting your valid data back in a nice object

The recommended way of getting a controller object is by wrapping
your component in `withValidation()()` and a controller object will
be passed in as a prop

most use cases can be handled with this concise snippet
```js
if (async controller.validate()) {
  const formData = controller.getValues();
}
```

## Api

### _async_ .validate()
the primary validation function, returns true if the form is valid.
It also deals with setting the error states on anything that isn't.

### getValues()
returns an object of key value pairs where the key is the name of the field and value is the user input

### .set(name, { valid: boolean, message: string });
used to manually set an error on a field by name, good for a failed login

### .get(name)
simply exists to accompany set

returns `{ valid, value, message }`


### .clear()
resets the controller, this is good if validated form fields are going to be dynamically added and removed 
