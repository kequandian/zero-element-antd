"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormItem = getFormItem;
exports.getActionItem = getActionItem;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactFinalForm = require("react-final-form");

var _FormItemWrapped = _interopRequireDefault(require("../container/Form/FormItemWrapped"));

var _ActionItemWrapped = _interopRequireDefault(require("../container/List/ActionItemWrapped"));

var _checkExpected = _interopRequireDefault(require("./checkExpected"));

function getFormItem(field, modelStatus, _ref) {
  var namespace = _ref.namespace,
      values = _ref.values;
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
      rest = (0, _objectWithoutProperties2["default"])(field, ["field", "label", "value", "extra", "span", "rules", "type", "options"]);
  var formData = modelStatus[options.expectedPath || 'formData'];

  if (!(0, _checkExpected["default"])((0, _objectSpread2["default"])({}, formData, values), options)) {
    return null;
  }

  return _react["default"].createElement(_reactFinalForm.Field, (0, _extends2["default"])({
    key: fieldName,
    name: fieldName,
    span: span
  }, rest, {
    validate: composeValidators.apply(void 0, (0, _toConsumableArray2["default"])(rules.map(handleRule)))
  }), function (_ref2) {
    var input = _ref2.input,
        meta = _ref2.meta;
    return _react["default"].createElement(_FormItemWrapped["default"], (0, _extends2["default"])({
      label: label,
      type: type,
      options: options,
      input: input,
      meta: meta,
      defaultValue: value,
      namespace: namespace
    }, rest));
  });
}

function getActionItem(action, modelStatus, namespace, handle) {
  var _action$options = action.options,
      options = _action$options === void 0 ? {} : _action$options;
  var listData = modelStatus[options.expectedPath || 'listData'];

  if (!(0, _checkExpected["default"])(listData, options)) {
    return null;
  }

  return _react["default"].createElement(_ActionItemWrapped["default"], (0, _extends2["default"])({
    namespace: namespace
  }, action, {
    handle: handle
  }));
}

function handleRule(rule) {
  if (typeof rule === 'string') {
    return defaultRule[rule] || defaultRule['undefined'];
  }
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
  required: function required(value) {
    return value ? undefined : '必填';
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