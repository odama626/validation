'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var regex = {
    tel: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    email: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
};
var phoneNumber = function () { return function (value) {
    var pass = regex.tel.test(value);
    return pass || { valid: false, message: 'not a valid phone number' };
}; };
var emailAddress = function () { return function (value) {
    return regex.email.test(value) || { valid: false, message: 'not a valid email address' };
}; };
var notEmpty = function () { return function (value) {
    return (value && value.length) || { valid: false, message: 'required' };
}; };

exports.phoneNumber = phoneNumber;
exports.emailAddress = emailAddress;
exports.notEmpty = notEmpty;
