"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/spin/style/css");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _react = _interopRequireDefault(require("react"));

var _component = _interopRequireDefault(require("@loadable/component"));

var _default = function _default(path) {
  return (0, _component["default"])(function () {
    return import("../".concat(path));
  }, {
    fallback: _react["default"].createElement(_spin["default"], null)
  });
  ;
};

exports["default"] = _default;