"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseTitle;

var _react = _interopRequireWildcard(require("react"));

var _layoutFlex = require("layout-flex");

require("./index.css");

var FlexItem = _layoutFlex.Flex.FlexItem;

function BaseTitle(props) {
  var title = props.title,
      style = props.style,
      children = props.children;
  var extraEl = (0, _react.useRef)(null);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style
  }, title ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-Layout-BaseTitle"
  }, /*#__PURE__*/_react["default"].createElement(_layoutFlex.Flex, null, /*#__PURE__*/_react["default"].createElement(FlexItem, {
    flex: 1
  }, title), /*#__PURE__*/_react["default"].createElement(FlexItem, null, /*#__PURE__*/_react["default"].createElement("div", {
    ref: extraEl
  })))) : null, /*#__PURE__*/_react["default"].createElement("div", {
    style: style,
    className: "ZEleA-Layout-Content"
  }, _react["default"].Children.map(children, function (child) {
    return _react["default"].cloneElement(child, {
      extraEl: extraEl
    });
  })));
}