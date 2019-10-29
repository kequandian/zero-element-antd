"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unique = unique;
exports.toNumber = toNumber;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

/**
 * 基本元素列表去重
 *
 * @export
 * @param {Array} argus 基本元素组成的列表
 */
function unique(argus) {
  return (0, _toConsumableArray2["default"])(new Set(argus.reduce(function (acc, val) {
    return acc.concat(val);
  }, [])));
}
/**
 * 尝试把数据转换为 Number 类型，若失败则返回原数据
 *
 * @export
 * @param {string} value
 * @returns
 */


function toNumber(value) {
  var v = value;

  if (v) {
    v = Number(v);

    if (isNaN(v)) {
      v = value;
    }
  }

  return v;
}