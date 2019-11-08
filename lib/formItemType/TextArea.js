"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _react = _interopRequireDefault(require("react"));

var TextArea = _input["default"].TextArea;

var _default = function _default(_ref) {
  var props = _ref.props,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["props"]);
  return _react["default"].createElement(TextArea, (0, _extends2["default"])({
    autoSize: {
      minRows: 2
    }
  }, rest, props));
};

exports["default"] = _default;