"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _default = function _default(item, i, _ref, onAction) {
  var index = _ref.index,
      record = _ref.record;
  return _react["default"].createElement("span", {
    key: i,
    onClick: onAction.bind(null, item.action, item.options),
    className: "ZEleA-table-action-Outside-normal"
  }, item.title);
};

exports["default"] = _default;