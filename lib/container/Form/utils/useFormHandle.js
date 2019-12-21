"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useFormHandle;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = require("react");

var _Model = require("zero-element/lib/Model");

var _Subscription = _interopRequireDefault(require("./Subscription"));

var toTypeMap = {
  'html': function html(value) {
    if (value && typeof value.toHTML === 'function') {
      return value.toHTML();
    }

    return value;
  },
  'raw': function raw(value) {
    if (value && typeof value.toRAW === 'function') {
      return value.toRAW();
    }

    return value;
  },
  'toValue': function toValue(value) {
    if ((0, _typeof2["default"])(value) === 'object' && value.hasOwnProperty('_toValue')) {
      return value._toValue;
    }

    return value;
  },
  'map': function map(value, _map) {
    if ((0, _typeof2["default"])(value) === 'object' && (0, _typeof2["default"])(_map) === 'object') {
      if (Array.isArray(value)) {
        return value.map(function (item) {
          return mapObject(item, _map);
        });
      } else {
        return mapObject(value, _map);
      }
    }
  }
};

function mapObject(obj, map) {
  var entries = Object.entries(map);
  Object.keys(obj).forEach(function (key) {
    var find = entries.find(function (arr) {
      return arr[1] === key;
    });

    if (find) {
      obj[find[0]] = obj[find[1]];
      delete obj[find[1]];
    }
  });
  return obj;
}

function useFormHandle(namespace, _ref) {
  var config = _ref.config,
      forceInitForm = _ref.forceInitForm,
      onGetOne = _ref.onGetOne;
  var formatValueRef = (0, _react.useRef)({}); // 记录在提交之前需要格式化的字段

  var sub = (0, _react.useRef)(new _Subscription["default"]());
  var model = (0, _Model.getModel)(namespace);
  var firstGetForm = (0, _react.useRef)(true);
  var API = config.API;
  (0, _react.useEffect)(function (_) {
    if (firstGetForm.current) {
      firstGetForm.current = false;
    } else {
      if (forceInitForm !== undefined && API.getAPI) {
        onGetOne && onGetOne({});
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [forceInitForm]);

  function formatValue(field, toType, opt) {
    // 保存需要 format 的 字段与 format 的方式
    if (opt) {
      formatValueRef.current[field] = {
        type: toType,
        options: opt
      };
    } else {
      formatValueRef.current[field] = toType;
    }
  }

  function handleGetFormData() {
    return model.getState().formData;
  }
  /**
   * 提交数据之前，格式化 value
   * 直接修改传入的 submitData
   *
   * @param {object} submitData
   */


  function handleFormatValue(submitData) {
    Object.keys(formatValueRef.current).forEach(function (field) {
      var typeRecord = formatValueRef.current[field];
      var type = typeRecord.type || typeRecord;
      var value = submitData[field];
      submitData[field] = toTypeMap[type](value, typeRecord.options);
    });
  }

  return [{
    sub: sub,
    model: model
  }, {
    onFormatValue: formatValue,
    // 字段自己标记自己是否需要在提交之前 format
    handleFormatValue: handleFormatValue,
    // format 全部已标记字段
    onSaveOtherValue: sub.current.changeValue.bind(sub.current),
    onGetFormData: handleGetFormData,
    // 获取 model 里面的 form data
    bindOnChange: sub.current.recordOnChange.bind(sub.current),
    onSpyChange: sub.current.subscriptionChange.bind(sub.current)
  }];
}