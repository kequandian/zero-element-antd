"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TableCheckbox;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _TableSelect = _interopRequireDefault(require("../TableSelect"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function TableCheckbox(_ref) {
  var value = _ref.value,
      field = _ref.field,
      optValue = _ref.optValue,
      onChange = _ref.onChange,
      onGetFormData = _ref.onGetFormData,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["value", "field", "optValue", "onChange", "onGetFormData"]);
  return /*#__PURE__*/_react["default"].createElement(_TableSelect["default"], {
    value: getSelectedKeys(value, onGetFormData, {
      field: field,
      vField: optValue
    }) // value={typeof value === 'object' ? [value] : [{ [optValue]: value }]}
    ,
    onChange: onChange,
    options: _objectSpread({
      type: 'checkbox',
      value: optValue
    }, rest)
  });
}

function getSelectedKeys(data, getFormData, _ref2) {
  var field = _ref2.field,
      vField = _ref2.vField;

  if (data) {
    if (Array.isArray(data.value)) {
      return data.value;
    }
  }

  var formData = getFormData();

  if (formData) {
    if ((0, _typeof2["default"])(formData) === 'object') {
      if (Array.isArray(formData[field])) {
        return formData[field];
      }
    }
  }

  return undefined;
}