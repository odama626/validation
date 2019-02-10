import { emailAddress, phoneNumber, notEmpty } from '../lib/tests';

describe('Provided Tests', () => {
  test('emailAddress', () => {
    expect(emailAddress()('a@b.com')).toBeTruthy();
    expect(emailAddress()('asdf')).toMatchSnapshot();
  });

  test('phoneNumber', () => {
    expect(phoneNumber()('123321123')).toMatchSnapshot();
    expect(phoneNumber()('1234566778')).toBeTruthy();
  });

  test('notEmpty', () => {
    expect(notEmpty()('')).toMatchSnapshot();
    expect(notEmpty()('blah')).toBeTruthy();
  })


})
