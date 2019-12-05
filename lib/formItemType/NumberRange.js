"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NumberRange;

require("antd/lib/input-number/style/css");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _layoutFlex = require("layout-flex");

var _tool = require("../utils/tool");

var FlexItem = _layoutFlex.Flex.FlexItem;

function NumberRange(_ref) {
  var value = _ref.value,
      props = _ref.props,
      options = _ref.options,
      onChange = _ref.onChange,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["value", "props", "options", "onChange"]);
  var _options$min = options.min,
      min = _options$min === void 0 ? [] : _options$min,
      _options$max = options.max,
      max = _options$max === void 0 ? [] : _options$max;
  var v = value || [null, null];

  function handleChange(index, data) {
    v[index] = (0, _tool.toNumber)(data);
    onChange(v);
  }

  return _react["default"].createElement(_layoutFlex.Flex, {
    className: "ZEleA-NumberRange"
  }, _react["default"].createElement(FlexItem, {
    flex: 1
  }, _react["default"].createElement(_inputNumber["default"], (0, _extends2["default"])({
    value: v[0],
    min: min[0],
    max: max[0]
  }, rest, props, {
    onChange: handleChange.bind(null, 0)
  }))), _react["default"].createElement("span", null, "~"), _react["default"].createElement(FlexItem, {
    flex: 1
  }, _react["default"].createElement(_inputNumber["default"], (0, _extends2["default"])({
    value: v[1],
    min: min[1],
    max: max[1]
  }, rest, props, {
    onChange: handleChange.bind(null, 1)
  }))));
}