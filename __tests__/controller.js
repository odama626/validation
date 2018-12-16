import React from 'react';
import renderer from 'react-test-renderer';
import withValidation, { Form, Controller } from '../lib/validation';

test('withValidation should add controller prop', () => {
  const Validated = withValidation()(({controller}) => (
      <div>{controller.toString()}</div>
    )
  )

  const component = renderer.create(<Validated />);


  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

// test('Controller should get what is set', () => {
//   expect((new Controller()).set('test', { value: 'test', valid: true})).toMatchSnapshot();

// });