"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = canPortal;

var _reactDom = _interopRequireDefault(require("react-dom"));

function canPortal(ref, reactEl) {
  if (ref && ref.current) {
    return _reactDom["default"].createPortal(reactEl, ref.current);
  }

  return reactEl;
}