import React from 'react';
import renderer from 'react-test-renderer';

import { Controller, SimpleWrapper } from '../lib/validation';

test('SimpleWrapper throws error when missing controller prop', () => {
  console.error = jest.fn();
  const test = () => {
    renderer.create(<SimpleWrapper />)
  }
  expect(test).toThrowErrorMatchingSnapshot();

  const test2 = () => {
    renderer.create(<SimpleWrapper name='test'/>);
  }
  expect(test2).toThrowErrorMatchingSnapshot();
})