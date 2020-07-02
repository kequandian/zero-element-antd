"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/spin/style/css");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _react = _interopRequireDefault(require("react"));

var _component = _interopRequireDefault(require("@loadable/component"));

var _default = function _default(path) {
  return (0, _component["default"])(function () {
    return Promise.resolve().then(function () {
      return (0, _interopRequireWildcard2["default"])(require("../".concat(path)));
    });
  }, {
    fallback: /*#__PURE__*/_react["default"].createElement(_spin["default"], null)
  });
  ;
};

exports["default"] = _default;