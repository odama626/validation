'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            onChange: _this.onChange.bind(_this),
            values: {},
            errors: {},
        };
        _this.props.controller.attachContext(_this);
        return _this;
    }
    Form.prototype.onChange = function (event, directName) {
        var _a, _b;
        var _c = this.state, values = _c.values, errors = _c.errors;
        var name = directName || event.target.dataset.name;
        var value = directName ? event : maybe('target.value', event);
        var nextState = {
            values: __assign({}, values, (_a = {}, _a[name] = value, _a)),
        };
        if (errors[name] && this.props.controller.validateByName(name, nextState.values)) {
            nextState['errors'] = __assign({}, errors, (_b = {}, _b[name] = false, _b));
        }
        this.setState(nextState);
    };
    Form.prototype.update = function (errors) {
        this.setState({ errors: errors });
    };
    Form.prototype.render = function () {
        var _a = this.props, controller = _a.controller, rest = __rest(_a, ["controller"]);
        var Context = this.Context;
        return (React.createElement(Context.Provider, { value: this.state },
            React.createElement("div", __assign({}, rest))));
    };
    return Form;
}(React.Component));
function maybe(path, obj) {
    var p = typeof path === 'string' ? path.split('.') : path;
    return p.reduce(function (result, next) { return result && result[next] !== 'undefined' ? result[next] : undefined; }, obj);
}

/**
 * _@core / Form / Controller_
 *
 * ### Control FormFields in a Form and handle validation
 * ```
 * `
 * Pass an instance of ${ Controller } into a ${ Form } and
 * it's ${ children FormFields } to manage input ${ updates }
 * and ${ validation } checks
 * `
 *```
 *
 */
var Controller = /** @class */ (function () {
    function Controller() {
        this.components = {};
        this.Context = React.createContext({
            errors: {},
            values: {},
            onChange: function (e) { return e; }
        });
    }
    Controller.prototype.attachContext = function (provider) {
        provider.Context = this.Context;
        this.provider = provider;
    };
    Controller.prototype.attachComponent = function (name, component) {
        this.components[name] = component;
        component.Context = this.Context;
    };
    Controller.prototype.validateByName = function (name, values) {
        var component = this.components[name];
        return component.validate ? component.validate(values[name], values) : true;
    };
    /**
     * ```
     * `
     * runs ${ validate } on all connected ${ FormFields }
     * inside containing ${ Form }
     *
     * marks all ${ FormFields } invalid that return falsey
     * from ${ validate } function
     *
     * returns ${ true } if all ${ FormFields } pass validation
     * `
     * ```
     * example:
     * ```
     * if (controller.validate()) {
     *   // Form is valid, grab form data
     *   let data = controller.getValues();
     * } else {
     *  // show error message here
     * }
     * ```
     */
    Controller.prototype.validate = function () {
        var _this = this;
        if (!this.provider || !this.provider.state) {
            throw new Error('FormController requires a provider, did you forget to set controller on your Form?');
        }
        var values = this.provider.state.values;
        var invalid = {};
        var valid = Object.keys(this.components).reduce(function (valid, key) {
            var c = _this.components[key];
            var v = c.validate ? c.validate(values[key], values) : true;
            invalid[key] = !v;
            return valid && v;
        }, true);
        if (typeof valid === 'undefined')
            return true;
        this.provider.update(invalid);
        return valid;
    };
    /**
     * ```
     * `
     * Get values from all connected ${ FormFields }
     *
     * returns ${ key value pairs } where the key is
     * the ${ FormField name } and the value is it's value
     * `
     * ```
     */
    Controller.prototype.getValues = function () {
        return this.provider.state.values;
    };
    return Controller;
}());

/**
 * _@core / Form / Wrapper_
 *
 * ### Wrap a component that has value and onChange
 * ```
 * `
 * sets ${data-name} of component to track onChange
 * adds ${data-error} when there is an error with the input
 * `
 * ```
 * ### Accepted Props
 * ```
 * controller: Core.FormController // instance of FormController
 * validate?: (value) => boolean // optional validation function
 * name: string // the key the value will be under in the controller
 * ```
 */
var Wrapper = /** @class */ (function (_super) {
    __extends(Wrapper, _super);
    function Wrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wrapper.prototype.validate = function (value, values) {
        var validate = this.props.validate;
        return validate ? validate(value || '', values) : true;
    };
    Wrapper.prototype.componentWillMount = function () {
        var controller = this.props.controller;
        controller && controller.attachComponent(this.props.name, this);
    };
    Wrapper.prototype.render = function () {
        var _a = this.props, name = _a.name, controller = _a.controller, children = _a.children;
        var Context = this.Context;
        return (React.createElement(Context.Consumer, null, function (state) {
            var values = state.values, errors = state.errors, onChange = state.onChange;
            var value = controller ? values[name] || '' : undefined;
            return children({ value: value, name: name, error: errors[name], onChange: function (e) { return onChange(e, name); } });
        }));
    };
    return Wrapper;
}(React.Component));
var Wrap = function (controller, W) {
    if (W === void 0) { W = Wrapper; }
    return function (props) { return (React.createElement(W, __assign({}, props, { controller: controller }))); };
};

/**
 * _@core / Form / Wrapper_
 *
 * ### Wrap a component that has value and onChange
 * ```
 * `
 * sets ${data-name} of component to track onChange
 * adds ${data-error} when there is an error with the input
 * `
 * ```
 * ### Accepted Props
 * ```
 * controller: Core.FormController // instance of FormController
 *
 * validate?: (value) => boolean // optional validation function
 *
 * name: string // the key the value will be under in the controller
 * ```
 */
var SimpleWrapper = /** @class */ (function (_super) {
    __extends(SimpleWrapper, _super);
    function SimpleWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleWrapper.prototype.validate = function (value, values) {
        var validate = this.props.validate;
        return validate ? validate(value || '', values) : true;
    };
    SimpleWrapper.prototype.componentWillMount = function () {
        var controller = this.props.controller;
        controller && controller.attachComponent(this.props.name, this);
    };
    SimpleWrapper.prototype.render = function () {
        var _a = this.props, name = _a.name, controller = _a.controller, validate = _a.validate, children = _a.children;
        var Context = this.Context;
        return (React.createElement(Context.Consumer, null, function (state) {
            var _a;
            var values = state.values, errors = state.errors, rest = __rest(state, ["values", "errors"]);
            var value = controller ? values[name] || '' : undefined;
            return React.cloneElement(children, __assign((_a = { name: name, value: value }, _a['data-name'] = name, _a['data-error'] = errors[name] || undefined, _a), rest));
        }));
    };
    return SimpleWrapper;
}(React.Component));

exports.Form = Form;
exports.Controller = Controller;
exports.Wrapper = Wrapper;
exports.SimpleWrapper = SimpleWrapper;
exports.Wrap = Wrap;
