"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Panel;

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _layoutFlex = require("layout-flex");

require("./index.css");

var FlexItem = _layoutFlex.Flex.FlexItem;

function Panel(_ref) {
  var title = _ref.title,
      _ref$defaultCollapse = _ref.defaultCollapse,
      defaultCollapse = _ref$defaultCollapse === void 0 ? false : _ref$defaultCollapse,
      _ref$delayed = _ref.delayed,
      delayed = _ref$delayed === void 0 ? false : _ref$delayed,
      children = _ref.children;

  var _useState = (0, _react.useState)(defaultCollapse),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      collapse = _useState2[0],
      setCollapse = _useState2[1];

  var _useReducer = (0, _react.useReducer)(function (x) {
    return x + 1;
  }, 0),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      count = _useReducer2[0],
      forcedUpdate = _useReducer2[1];

  var domContent = (0, _react.useRef)(null);
  var height = (0, _react.useRef)(undefined);

  var _useMemo = (0, _react.useMemo)(function (_) {
    if (collapse) {
      return [{
        height: 0,
        padding: 0
      }, {
        transform: 'rotate(180deg)'
      }];
    }

    return [{
      height: height.current,
      padding: undefined
    }, {
      transform: undefined
    }]; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapse, count]),
      _useMemo2 = (0, _slicedToArray2["default"])(_useMemo, 2),
      contentStyle = _useMemo2[0],
      iconStyle = _useMemo2[1];

  (0, _react.useEffect)(function (_) {
    if (!collapse) {
      setTimeout(function (_) {
        height.current = undefined;
        forcedUpdate();
      }, 200);
    }
  }, [collapse]);

  function handleCollapse() {
    if (!collapse) {
      height.current = domContent.current.clientHeight;
    }

    setCollapse(!collapse);
  }

  return _react["default"].createElement("div", {
    className: "ZEleA-Panel"
  }, _react["default"].createElement(_layoutFlex.Flex, {
    className: "ZEleA-Panel-title"
  }, _react["default"].createElement(FlexItem, {
    flex: 1
  }, _react["default"].createElement("div", {
    onClick: handleCollapse
  }, title)), _react["default"].createElement(FlexItem, {
    className: "ZEleA-Panel-icon",
    style: iconStyle
  }, _react["default"].createElement(_icon["default"], {
    type: "down",
    onClick: handleCollapse
  }))), _react["default"].createElement("div", {
    className: "ZEleA-Panel-content",
    ref: domContent,
    style: contentStyle
  }, delayed ? !collapse && children : children));
}