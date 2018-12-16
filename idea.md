# Possible patterns

## Use withValidation ( kind of like react-redux connect);

```js
import withValidation, { SimpleWrapper } from '@omarzion/validation';

const ValidatedForm = ({ controller, Username, Password }) => (
  <Form controller={controller}>
    <Username name='username'><input /></Username>
    <Password name='password'><input type='password'/></Password>
    <button onClick={() => controller.validate() ? dispatch(controller.getValues()) : null}>Submit</button>
  </Form>
)

export default withValidation(register => ({
  Username: register(SimpleWrapper, `validation function`),
  Password: register(SimpleWrapper, `validation function`)
}))(ValidatedForm);

```

## use withValidator ( wrapping the component in a HOC)
```js
// component.js
import { withValidator } from '@omarzion/validation';
const PasswordInput = <input type='password' />;
const UsernameInput = <input />

export const Password = withValidator(PasswordInput, `validation function`);
export const Username = withValidator(UsernameInput, `validation function`);
```

```js
import withValidation from '@omarzion/validation';
import { Password, Username } from './component';

const ValidatedForm = ({controller}) => (
  <Form controller={controller}>
    <Username name='username' controller={controller}/>
    <Password name='password' controller={controller}/>
    <button onClick={() => controller.validate() ? dispatch(controller.getValues()) : null}>Submit</button>
  </Form>
)

export default withValidation()(ValidatedForm);
```

## Or use both?
```js
// component.js
import { withValidator } from '@omarzion/validation';

const PasswordInput = <input type='password' />;
const UsernameInput = <input />

export const Password = withValidator(PasswordInput, `validation function`);
export const Username = withValidator(UsernameInput, `validation function`);
```

```js
import withValidation from '@omarzion/validation';
import { Password, Username } from './component';

const ValidatedForm = ({controller, User, Pass}) => (
  <Form controller={controller}>
    <User name='username'/>
    <Pass name='password'/>
    <button onClick={() => controller.validate() ? dispatch(controller.getValues()) : null}>Submit</button>
  </Form>
)

export default withValidation(register => ({
  User: Username,
  Pass: Password,
  OtherInput: register(...)
}))(ValidatedForm);
```

