"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _context = _interopRequireDefault(require("../utils/context"));

var _Layout = _interopRequireDefault(require("./Layout"));

var _default = function _default(props) {
  var config = props.config,
      dispatch = props.dispatch;
  var value = config.value,
      items = config.items;
  return _react["default"].createElement(_antd.Row, null, Array(value.length).fill(1).map(function (_, i) {
    var itemCfg = items[i] || {};
    return _react["default"].createElement(_antd.Col, {
      key: i,
      span: value[i]
    }, _react["default"].createElement(_Layout["default"], {
      index: i,
      itemCfg: itemCfg,
      config: config,
      dispatch: dispatch
    }));
  }));
};

exports["default"] = _default;