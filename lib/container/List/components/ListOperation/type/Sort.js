"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _react = _interopRequireDefault(require("react"));

var _default = function _default(item, i, _ref) {
  var index = _ref.index,
      record = _ref.record,
      records = _ref.records;
  return _react["default"].createElement("span", {
    key: i,
    className: "ZEleA-table-action-Sort"
  }, index === 0 ? null : _react["default"].createElement(_icon["default"], {
    type: "arrow-up",
    title: "\u4E0A\u79FB"
  }), index === records.length - 1 ? null : _react["default"].createElement(_icon["default"], {
    type: "arrow-down",
    title: "\u4E0B\u79FB"
  }));
};

exports["default"] = _default;