"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Expect;

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _react = _interopRequireDefault(require("react"));

function Expect(_ref) {
  var data = _ref.data,
      onChange = _ref.onChange;
  var _data$expectedField = data.expectedField,
      expectedField = _data$expectedField === void 0 ? {} : _data$expectedField,
      _data$expectedValue = data.expectedValue,
      expectedValue = _data$expectedValue === void 0 ? {} : _data$expectedValue;

  function handleChange(field, e) {
    onChange(field, e.target.value);
  }

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", null, "\u9884\u671F\u5B57\u6BB5: "), /*#__PURE__*/_react["default"].createElement(_input["default"], {
    value: expectedField.value,
    onChange: handleChange.bind(null, 'expectedField')
  }), /*#__PURE__*/_react["default"].createElement("div", null, "\u9884\u671F\u503C: "), /*#__PURE__*/_react["default"].createElement(_input["default"], {
    value: expectedValue.value,
    onChange: handleChange.bind(null, 'expectedValue')
  }));
}