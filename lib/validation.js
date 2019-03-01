'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

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

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
        var _this = this;
        var _a;
        var _b = this.state, values = _b.values, errors = _b.errors;
        var name = directName || event.target.dataset.name;
        var value = directName ? event : maybe('target.value', event);
        var nextState = {
            values: __assign({}, values, (_a = {}, _a[name] = value, _a)),
        };
        if (errors[name] && !errors[name].valid) {
            Promise.resolve(this.props.controller.validateByName(name, nextState.values))
                .then(function (result) { return _this.setState(function (state) {
                var _a;
                return ({ errors: __assign({}, state.errors, (_a = {}, _a[name] = result, _a)) });
            }); });
            // let result = await this.props.controller.validateByName(name, nextState.values);
            // nextState['errors'] = { ...errors, [name]: result };
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
function testValidity(test, name, values) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (test ? Promise.resolve(test(values[name], values)) : Promise.resolve(true))];
                case 1:
                    result = _a.sent();
                    if (result.message || result.valid) {
                        return [2 /*return*/, result];
                    }
                    return [2 /*return*/, { valid: result }];
            }
        });
    });
}
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
    Controller.prototype.attachComponent = function (name, component, defaultValue) {
        this.components[name] = component;
        component.Context = this.Context;
        if (defaultValue) {
            this.set(name, { value: defaultValue });
        }
    };
    Controller.prototype.validateByName = function (name, values) {
        return __awaiter(this, void 0, void 0, function () {
            var component;
            return __generator(this, function (_a) {
                component = this.components[name];
                return [2 /*return*/, testValidity(component.validate, name, values)];
            });
        });
    };
    Controller.prototype.set = function (name, opts) {
        if (!this.provider || !this.provider.state)
            throw new Error('FormController requires a provider');
        var state = __assign({}, this.provider.state);
        state.values[name] = 'value' in opts ? opts.value : state.values[name];
        var value = opts.value, rest = __rest(opts, ["value"]);
        state.errors[name] = 'valid' in rest || 'message' in rest ? rest : state.errors[name];
        this.provider.setState(state);
    };
    Controller.prototype.get = function (name) {
        var state = this.provider.state;
        return {
            value: state.values[name],
            valid: state.errors[name] ? state.errors[name].valid : true,
            message: state.errors[name] ? state.errors[name].message : undefined
        };
    };
    Controller.prototype.getErrors = function () {
        var state = this.provider.state;
        return Object.keys(state.errors)
            .filter(function (key) { return !state.errors[key].valid; })
            .map(function (name) { return ({ name: name, message: state.errors[name].message }); });
    };
    Controller.prototype.clear = function () {
        this.provider.setState({ values: {}, errors: {} });
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
        return __awaiter(this, void 0, void 0, function () {
            var values, invalid, valids, valid;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.provider || !this.provider.state) {
                            throw new Error('FormController requires a provider, did you forget to set controller on your Form?');
                        }
                        values = this.provider.state.values;
                        invalid = {};
                        return [4 /*yield*/, Promise.all(Object.keys(this.components).map(function (key) { return __awaiter(_this, void 0, void 0, function () {
                                var v;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, testValidity(this.components[key].validate, key, values)];
                                        case 1:
                                            v = _a.sent();
                                            invalid[key] = v;
                                            return [2 /*return*/, v];
                                    }
                                });
                            }); }))];
                    case 1:
                        valids = _a.sent();
                        valid = valids.reduce(function (valid, next) { return valid && next.valid; }, true);
                        if (typeof valid === 'undefined')
                            return [2 /*return*/, true];
                        this.provider.update(invalid);
                        return [2 /*return*/, valid];
                }
            });
        });
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
        var _a = this.props, controller = _a.controller, children = _a.children, defaultValue = _a.defaultValue, name = _a.name;
        this.validate = this.validate.bind(this);
        controller && controller.attachComponent(name, this, defaultValue);
        if (!children || typeof children !== 'function') {
            throw Error('children of Wrapper must be a function');
        }
    };
    Wrapper.prototype.render = function () {
        var _a = this.props, name = _a.name, controller = _a.controller, children = _a.children;
        var Context = this.Context;
        if (!children) {
            throw Error('children of Wrapper must be a function');
        }
        return (React.createElement(Context.Consumer, null, function (state) {
            var values = state.values, errors = state.errors, onChange = state.onChange;
            var value = controller ? values[name] || '' : undefined;
            var validate = errors[name];
            return children({ value: value, name: name, error: validate ? !validate.valid : false, message: validate && validate.message, onChange: function (e) { return onChange(e, name); } });
        }));
    };
    return Wrapper;
}(React.Component));
// export const Wrap = (controller: Core.FormController, W: any = Wrapper) => (
//   (props: typeof W['props'] & { controller?: any}) => (
//     <W {...props} controller={controller} />
//   )
// )
var Wrap = function (controller, W, validator) {
    if (W === void 0) { W = Wrapper; }
    return function (props) { return (React.createElement(W, __assign({}, __assign({ validate: validator }, props), { controller: controller }))); };
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
        var _a = this.props, controller = _a.controller, name = _a.name;
        this.validate = this.validate.bind(this);
        if (controller) {
            controller.attachComponent(this.props.name, this);
        }
        else {
            throw Error("SimpleWrapper with name '" + name + "' failed to connect to controller.  did you forget to add controller prop?");
        }
    };
    SimpleWrapper.prototype.render = function () {
        var _a = this.props, name = _a.name, controller = _a.controller, validate = _a.validate, children = _a.children;
        var Context = this.Context;
        return (React.createElement(Context.Consumer, null, function (state) {
            var _a;
            var values = state.values, errors = state.errors, rest = __rest(state, ["values", "errors"]);
            var value = controller ? values[name] || '' : undefined;
            var validate = errors[name];
            var error = validate ? (validate.valid ? undefined : true) : undefined;
            return React.cloneElement(children, __assign((_a = { value: value }, _a['data-name'] = name, _a['data-error'] = error, _a['data-message'] = validate && validate.message, _a), rest));
        }));
    };
    return SimpleWrapper;
}(React.Component));

function withValidation (register) {
    return function (WrappedComponent) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1(props) {
                var _this = _super.call(this, props) || this;
                _this.controller = new Controller();
                _this.validators = {};
                if (register) {
                    _this.validators = register(validator(_this.controller));
                }
                return _this;
            }
            class_1.prototype.render = function () {
                return (React__default.createElement(Form, { controller: this.controller },
                    React__default.createElement(WrappedComponent, __assign({}, this.props, this.validators, { controller: this.controller }))));
            };
            return class_1;
        }(React__default.Component));
    };
}
function validator(controller) {
    return function (wrappedComponent, validator) {
        return Wrap(controller, wrappedComponent, validator);
    };
}

exports.Form = Form;
exports.Controller = Controller;
exports.Wrapper = Wrapper;
exports.SimpleWrapper = SimpleWrapper;
exports.Wrap = Wrap;
exports.default = withValidation;
