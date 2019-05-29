"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _LayoutItem = _interopRequireDefault(require("../wrapped/LayoutItem"));

var _default = function _default(props) {
  var title = props.title,
      _props$type = props.type,
      type = _props$type === void 0 ? 'Grid' : _props$type,
      rest = (0, _objectWithoutProperties2["default"])(props, ["title", "type"]);
  return _react["default"].createElement(_LayoutItem["default"], (0, _extends2["default"])({
    type: type
  }, props), _react["default"].createElement(_antd.Button, {
    size: "small"
  }, title));
};

exports["default"] = _default;