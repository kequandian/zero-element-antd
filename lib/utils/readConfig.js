"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormItem = getFormItem;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactFinalForm = require("react-final-form");

var _formItenType = require("zero-element-global/lib/formItenType");

var _checkExpected = _interopRequireDefault(require("./checkExpected"));

function getFormItem(field, modelStatus) {
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

  if (!(0, _checkExpected["default"])(formData, options)) {
    return null;
  }

  return _react["default"].createElement(_reactFinalForm.Field, {
    key: fieldName,
    name: fieldName,
    validate: composeValidators(required)
  }, function (_ref) {
    var input = _ref.input,
        meta = _ref.meta;
    console.log(3444, input, meta);
    return _react["default"].createElement(_react["default"].Fragment, null, label, ":", _react["default"].createElement(_formItenType.Render, (0, _extends2["default"])({
      n: type,
      options: options
    }, rest)));
  });
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

var required = function required(value) {
  return value ? undefined : '必填';
};