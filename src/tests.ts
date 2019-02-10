const regex = {
  tel: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
}

export const phoneNumber = () => value => {
  let pass = regex.tel.test(value);
  return pass || { valid: false, message: 'not a valid phone number' };
}

export const emailAddress = () => value => {
  return regex.email.test(value) || { valid: false, message: 'not a valid email address'};
}

export const notEmpty = () => value => {
  return (value && value.length) || { valid: false, message: 'required'};
}
