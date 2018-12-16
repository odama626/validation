const regex = {
  tel: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
}

function TelephoneNumber(value) {
  return regex.tel.test(value);
}

function EmailAddress(value) {
  return regex.email.test(value);
}

function NotEmpty(value) {
  return value && value.length;
}

export default {
  TelephoneNumber,
  EmailAddress,
  NotEmpty
}

export function phoneNumber(value, values): string {
  if (value.length === 0) return '';
  let s = value.replace(/\D/g, '');
  if (s.length < 10 ) {
    
  }
  let types = ['000-000-0000', '0-000-000-0000', '000-000-0000 etx 0+'];
  let format = types.filter(type => type.replace(/\D/g, '').length === s.length || type.indexOf('+') > -1);
  if (format.length) {
    return format[0].replace(/0|\+/g, match => {
      if (match === '0') {
        let char = s[0];
        s = s.slice(1);
        return char;
      } else if (match === '+') {
        let count = value.replace(/\D/g, '').length - format[0].replace(/\D/g, '').length;
        let chars = s.slice(0, count);
        s = s.slice(count);
        return chars;
      }
      return '';
    });
  }

  return value;
}