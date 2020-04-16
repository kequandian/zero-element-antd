"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Render = _interopRequireDefault(require("../utils/Render"));

require("../index.css");

var _default = function _default(props) {
  var layoutType = props.layoutType,
      rest = (0, _objectWithoutProperties2["default"])(props, ["layoutType"]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-EchoPanel ZEleA-Form-".concat(layoutType)
  }, /*#__PURE__*/_react["default"].createElement(_Render["default"], rest));
};

exports["default"] = _default;