"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CollapseWrapped;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/lib/collapse/style/css");

var _collapse = _interopRequireDefault(require("antd/lib/collapse"));

var _react = _interopRequireDefault(require("react"));

var Panel = _collapse["default"].Panel;

function CollapseWrapped(props) {
  var _props$title = props.title,
      title = _props$title === void 0 ? [] : _props$title,
      _props$panelStyle = props.panelStyle,
      panelStyle = _props$panelStyle === void 0 ? {} : _props$panelStyle,
      children = props.children,
      rest = (0, _objectWithoutProperties2["default"])(props, ["title", "panelStyle", "children"]);
  return /*#__PURE__*/_react["default"].createElement(_collapse["default"], rest, _react["default"].Children.map(children, function (child, i) {
    return /*#__PURE__*/_react["default"].createElement(Panel, {
      header: title[i],
      style: panelStyle
    }, child);
  }));
}