"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _default = function _default(_ref) {
  var props = _ref.props,
      defaultValue = _ref.defaultValue,
      value = _ref.value,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["props", "defaultValue", "value"]);
  return /*#__PURE__*/_react["default"].createElement(_checkbox["default"].Group, (0, _extends2["default"])({
    defaultValue: typeof defaultValue === 'string' ? [] : defaultValue,
    value: typeof value === 'string' ? [] : value
  }, rest, props));
};

exports["default"] = _default;