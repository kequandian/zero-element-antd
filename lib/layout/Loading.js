"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Loading;

require("antd/lib/spin/style/css");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _react = _interopRequireDefault(require("react"));

function Loading(props) {
  var _props$loading = props.loading,
      loading = _props$loading === void 0 ? true : _props$loading,
      children = props.children;
  return _react["default"].createElement(_spin["default"], {
    spinning: loading
  }, children);
}