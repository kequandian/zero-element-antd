"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = checkExpected;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

/**
 * 检测该行数据的字段的值 是否符合预期
 *
 * @param {*} record
 * @param {*} options
 * @returns
 */
var rulesMap = {
  'IS_NOT_NULL': function IS_NOT_NULL(value) {
    if ((0, _typeof2["default"])(value) === 'object') {
      if (Array.isArray(value)) {
        return value.length !== 0;
      }

      return Object.keys(value || {}).length !== 0;
    }

    return value === 0 ? true : Boolean(value);
  }
};

function checkExpected() {
  var record = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var expect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var field = expect.field,
      value = expect.value,
      permission = expect.permission; // // 若需要检测权限
  // if (permission) {
  //   if (checkPerm(permission) === false) {
  //     return false;
  //   }
  // }

  if (!field) return true; // 没有预期就是什么都凑合

  var fieldList = field instanceof Array ? field : [field];
  var valueList = value instanceof Array ? value : [value];
  return fieldList.every(function (fields, i) {
    var values = valueList[i];

    if (Array.isArray(fields)) {
      return fields.some(function (field) {
        var recordValue = record[field];
        return extendsExpectedValue(values, recordValue);
      });
    } else {
      var recordValue = record[fields];
      return extendsExpectedValue(values, recordValue);
    }
  });
}
/**
 *
 *
 * @param {*} value 预期的值
 * @param {*} recordValue 列表的数据对应的字段的值
 * @returns Boolean
 */


function judge(value, recordValue) {
  // 若不是简单的相等关系的话
  if (recordValue !== value) {
    // 先看看 value 是不是预设关键字
    if (rulesMap[value]) {
      if (!rulesMap[value](recordValue)) {
        return false;
      }
    } else {
      // 再看看 value 是不是传入了正则表达式
      // ^\/[\S\s]+\/[gimy]*$   预期匹配字符串： '/test ok/g'
      var regexCheck = new RegExp(/^\/[\S\s]+\/[gimy]*$/, 'g');

      if (!regexCheck.test(value)) {
        return false;
      }

      var valueSplit = value.split('/');
      var ExpectedRegex = new RegExp(valueSplit[1], valueSplit[2]);

      if (!ExpectedRegex.test(recordValue)) {
        return false;
      }
    }
  }

  return true;
}
/**
 * 仅仅是用来处理 value 为数组的情况下，减少代码重复而已
 *
 * @param {*} values
 * @param {*} recordValue
 * @returns Boolean
 */


function extendsExpectedValue(values, recordValue) {
  if (Array.isArray(values)) {
    return values.some(function (value) {
      return judge(value, recordValue);
    });
  } else {
    return judge(values, recordValue);
  }
}