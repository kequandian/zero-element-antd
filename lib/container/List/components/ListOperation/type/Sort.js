"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _default = function _default(item, i, _ref) {
  var index = _ref.index,
      record = _ref.record,
      records = _ref.records;
  return _react["default"].createElement("span", {
    key: i,
    className: "ZEle-table-action-Sort"
  }, index === 0 ? null : _react["default"].createElement(_antd.Icon, {
    type: "arrow-up",
    title: "\u4E0A\u79FB"
  }), index === records.length - 1 ? null : _react["default"].createElement(_antd.Icon, {
    type: "arrow-down",
    title: "\u4E0B\u79FB"
  }));
};

exports["default"] = _default;