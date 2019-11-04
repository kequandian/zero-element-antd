"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function formatInit(rspData) {
  if (!rspData) return [];

  if (rspData.id) {
    return rspData;
  } else if (rspData.children) {
    return rspData.children;
  }

  return [];
}

var _default = formatInit;
exports["default"] = _default;