"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unique = unique;
exports.toNumber = toNumber;
exports.arrayItemMove = arrayItemMove;

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
/**
 * 上移或下移数组内的某一项，直接改变原数组
 *
 * @export
 * @param {array} arr
 * @param {string} type up | down
 * @param {number} index
 */


function arrayItemMove(arr, type, index) {
  if (arr < 2) return false;

  if (type === 'up' && index > 0) {
    arr.splice.apply(arr, [index - 1, 1].concat((0, _toConsumableArray2["default"])(arr.splice(index, 1, arr[index - 1]))));
  } else if (type === 'dowm' && index < arr.length - 1) {
    arr.splice.apply(arr, [index + 1, 1].concat((0, _toConsumableArray2["default"])(arr.splice(index, 1, arr[index + 1]))));
  }
}