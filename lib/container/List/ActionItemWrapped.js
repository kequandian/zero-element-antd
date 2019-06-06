"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ActionItemWrapped;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _actionItemType = require("zero-element-global/lib/actionItemType");

function ActionItemWrapped(_ref) {
  var type = _ref.type,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["type"]);
  return _react["default"].createElement(_actionItemType.Render, (0, _extends2["default"])({
    n: type
  }, rest));
}