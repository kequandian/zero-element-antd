"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

require("./index.css");

var _default = function _default(props) {
  var name = props.name,
      value = props.value,
      checkedValue = props.checkedValue,
      onChange = props.onChange,
      children = props.children;
  var sValue = String(value);
  return _react["default"].createElement("div", {
    onClick: onChange.bind(null, sValue),
    className: "ZEle-MRadio-Item"
  }, _react["default"].createElement("div", {
    className: "ZEle-MRadio-radio"
  }, _react["default"].createElement("div", {
    className: sValue === checkedValue ? 'checked' : ''
  })), _react["default"].createElement("div", {
    className: "ZEle-MRadio-label"
  }, _react["default"].createElement("span", null, children)));
};

exports["default"] = _default;