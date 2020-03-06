"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormItem = getFormItem;
exports.getActionItem = getActionItem;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactFinalForm = require("react-final-form");

var _FormItemWrapped = _interopRequireDefault(require("../container/Form/FormItemWrapped"));

var _ActionItemWrapped = _interopRequireDefault(require("../container/List/ActionItemWrapped"));

var _checkExpected = _interopRequireDefault(require("./checkExpected"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getFormItem(field, modelStatus, _ref) {
  var namespace = _ref.namespace,
      values = _ref.values,
      handle = _ref.handle,
      bindOnChange = _ref.bindOnChange,
      hooks = _ref.hooks;
  var fieldName = field.field,
      label = field.label,
      value = field.value,
      _field$extra = field.extra,
      extra = _field$extra === void 0 ? '' : _field$extra,
      span = field.span,
      _field$rules = field.rules,
      rules = _field$rules === void 0 ? [] : _field$rules,
      type = field.type,
      _field$options = field.options,
      options = _field$options === void 0 ? {} : _field$options,
      expect = field.expect,
      rest = (0, _objectWithoutProperties2["default"])(field, ["field", "label", "value", "extra", "span", "rules", "type", "options", "expect"]);
  var formData = modelStatus[options.expectedPath || 'formData'];

  if (type === 'empty') {
    return null;
  }

  if (options.expectedField) {
    console.warn('options 的 expectedField 即将弃用，请改为放在 expect 内');
  }

  if (!(0, _checkExpected["default"])(_objectSpread({}, formData, {}, values), expect || options)) {
    return null;
  }

  return _react["default"].createElement(_reactFinalForm.Field, (0, _extends2["default"])({
    key: fieldName,
    name: fieldName,
    span: span,
    parse: function parse(value) {
      return value;
    }
  }, rest, {
    validate: composeValidators.apply(void 0, (0, _toConsumableArray2["default"])(rules.map(handleRule)))
  }), function (_ref2) {
    var input = _ref2.input,
        meta = _ref2.meta;

    if (bindOnChange) {
      bindOnChange(input.name, input.onChange);
    }

    return _react["default"].createElement(_FormItemWrapped["default"], (0, _extends2["default"])({
      label: label,
      type: type,
      options: options,
      input: input,
      meta: meta,
      defaultValue: value,
      namespace: namespace,
      handle: handle,
      required: rules.findIndex(function (r) {
        return r === 'required';
      }) > -1,
      formdata: values,
      hooks: hooks
    }, rest));
  });
}

function getActionItem(action, modelStatus, handle, props) {
  var _action$options = action.options,
      options = _action$options === void 0 ? {} : _action$options,
      expect = action.expect;
  var listData = modelStatus[options.expectedPath || 'listData'];

  if (options.expectedField) {
    console.warn('options 的 expectedField 即将弃用，请改为放在 expect 内');
  }

  if (!(0, _checkExpected["default"])(listData, expect || options)) {
    return null;
  }

  return _react["default"].createElement(_ActionItemWrapped["default"], (0, _extends2["default"])({}, props, action, {
    handle: handle
  }));
}

function handleRule(rule) {
  if (typeof rule === 'string') {
    return ruleWrapped(defaultRule[rule]) || defaultRule['undefined'];
  } else if ((0, _typeof2["default"])(rule) === 'object') {
    var type = rule.type,
        message = rule.message;

    if (type) {
      return ruleWrapped(defaultRule[type], message);
    } else {
      return defaultRule['undefined'];
    }
  }

  return defaultRule['error'];
}

var composeValidators = function composeValidators() {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return function (value) {
    return validators.reduce(function (error, validator) {
      return error || validator(value);
    }, undefined);
  };
};

var defaultRule = {
  required: function required() {
    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '必填';
    var value = arguments.length > 1 ? arguments[1] : undefined;
    return Boolean(value) || value === 0 ? undefined : msg;
  },
  mail: function mail() {
    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '请输入正确的电子邮箱格式';
    var value = arguments.length > 1 ? arguments[1] : undefined;
    if (!value && value !== 0) return undefined;
    return /\w+@\w+.\w+/.test(value) ? undefined : msg;
  },
  phone: function phone() {
    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '请输入正确的手机号码格式';
    var value = arguments.length > 1 ? arguments[1] : undefined;
    if (!value && value !== 0) return undefined;
    return /^1[3456789]\d{9}$/.test(value) ? undefined : msg;
  },
  error: function error(value) {
    return console.warn("\u975E\u6CD5\u7684 rules \u5B50\u9879: ".concat(value)) && undefined;
  },
  undefined: function (_undefined) {
    function undefined(_x) {
      return _undefined.apply(this, arguments);
    }

    undefined.toString = function () {
      return _undefined.toString();
    };

    return undefined;
  }(function (value) {
    return console.warn("\u503C: ".concat(value, " \u4F7F\u7528\u4E86\u672A\u77E5\u7684\u6821\u9A8C\u89C4\u5219")) && undefined;
  })
};

function ruleWrapped(func, msg) {
  return func.bind(null, msg);
}