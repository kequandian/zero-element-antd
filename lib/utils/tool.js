"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unique = unique;
exports.uniqueObjList = uniqueObjList;
exports.sortObjList = sortObjList;
exports.mapObjList = mapObjList;
exports.toNumber = toNumber;
exports.returnFloat = returnFloat;
exports.returnFloatOne = returnFloatOne;
exports.arrayItemMove = arrayItemMove;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
 * 对象列表去重, 需要含有 key id
 *
 * @export
 * @param {array} list
 * @param {array} newList
 */


function uniqueObjList(list, newList) {
  var idSet = new Set(newList.map(function (i) {
    return i.id;
  }));
  return [].concat((0, _toConsumableArray2["default"])(list.filter(function (i) {
    return !idSet.has(i.id);
  })), (0, _toConsumableArray2["default"])(newList));
}
/**
 * 对象列表排序, 需要含有 key id
 *
 * @export
 * @param {array} list
 * @param {boolean} type 是否升序, 默认 true
 * @returns
 */


function sortObjList(list) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return list.sort(function (a, b) {
    if (type) {
      return a.id - b.id;
    }

    return b.id - a.id;
  });
}
/**
 * 根据 key id 来合并对象
 *
 * @export
 * @param {array} list 把另一个数组的 同id对象 合并到这里
 * @param {array} newList
 * @param {array} exclude 不需要合并的 key
 * @return {array} rstList 返回合并并去重后的数组
 */


function mapObjList(list, newList) {
  var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var rst = [];
  list.forEach(function (i) {
    var find = newList.find(function (p) {
      return p.id === i.id;
    });

    if (find) {
      var obj = _objectSpread({}, find);

      exclude.forEach(function (key) {
        delete obj[key];
      });
      rst.push(Object.assign(i, obj));
    } else {
      rst.push(i);
    }
  });
  return uniqueObjList(newList, rst);
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

  if (value) {
    v = Number(value);

    if (isNaN(v)) {
      v = value;
    }
  }

  return v;
}
/**
 * 保留两位小数, 不足补零
 * @param {number} value 
 */


function returnFloat(value) {
  var value = Math.round(parseFloat(value) * 100) / 100;
  var s = value.toString().split(".");

  if (s.length == 1) {
    value = value.toString() + ".00";
    return value;
  }

  if (s.length > 1) {
    if (s[1].length < 2) {
      value = value.toString() + "0";
    }

    return value;
  }
}
/**
 * 保留一位小数, 不足补零
 * @param {number} value 
 */


function returnFloatOne(value) {
  var value = Math.round(parseFloat(value) * 10) / 10;
  var s = value.toString().split(".");

  if (s.length == 1) {
    value = value.toString() + ".0";
    return value;
  }

  return value;
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
  if (!Array.isArray(arr) || arr.length < 2) return false;

  if (type === 'up' && index > 0) {
    arr.splice.apply(arr, [index - 1, 1].concat((0, _toConsumableArray2["default"])(arr.splice(index, 1, arr[index - 1]))));
  } else if (type === 'down' && index < arr.length - 1) {
    arr.splice.apply(arr, [index + 1, 1].concat((0, _toConsumableArray2["default"])(arr.splice(index, 1, arr[index + 1]))));
  }
}