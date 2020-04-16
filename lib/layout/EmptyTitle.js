"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EmptyTitle;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _layoutFlex = require("layout-flex");

require("./index.css");

var FlexItem = _layoutFlex.Flex.FlexItem;

function EmptyTitle(props) {
  var title = props.title,
      style = props.style,
      extra = props.extra,
      children = props.children;

  var _useState = (0, _react.useState)(extra),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      extraEle = _useState2[0],
      setExtraEle = _useState2[1];

  function onSetExtraElement(ele) {
    setExtraEle(ele);
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    style: style
  }, title ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-Layout-EmptyTitle"
  }, /*#__PURE__*/_react["default"].createElement(_layoutFlex.Flex, null, /*#__PURE__*/_react["default"].createElement(FlexItem, {
    flex: 1
  }, title), /*#__PURE__*/_react["default"].createElement(FlexItem, null, extraEle))) : null, _react["default"].Children.map(children, function (child) {
    return _react["default"].cloneElement(child, {
      onSetExtraElement: onSetExtraElement
    });
  }));
}