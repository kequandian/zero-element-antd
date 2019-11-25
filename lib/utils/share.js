"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setShare = setShare;
exports.getShareData = getShareData;
exports.destroyShare = destroyShare;
var data = {};

function setShare(key, value) {
  data[key] = value;
}

function getShareData(key) {
  if (data[key]) {
    return data[key];
  }

  return {};
}

function destroyShare(key) {
  delete data[key];
}