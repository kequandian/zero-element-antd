"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useFormHandle;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _react = require("react");

var _Model = require("zero-element/lib/Model");

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var toTypeMap = {
  'html': function html(value) {
    if (value && (0, _typeof2["default"])(value) === 'object') {
      var current = value.current;
      if (typeof current.toHTML === 'function') return current.toHTML();
    }

    return value;
  },
  'raw': function raw(value) {
    if (value && (0, _typeof2["default"])(value) === 'object') {
      var current = value.current;
      if (typeof current.toRAW === 'function') return current.toRAW();
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

    return value;
  },
  'JSONString': function JSONString(value) {
    if ((0, _typeof2["default"])(value) === 'object') {
      return JSON.stringify(value);
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

function useFormHandle(form, _ref) {
  var namespace = _ref.namespace,
      config = _ref.config,
      forceInitForm = _ref.forceInitForm,
      onGetOne = _ref.onGetOne;
  var formatValueRef = (0, _react.useRef)({}); // 记录在提交之前需要格式化的字段

  var expectFieldRef = (0, _react.useRef)({}); // 记录需要 expect 的字段

  var forceUpdate = (0, _lifeCycle.useForceUpdate)();
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
    return form.getFieldsValue();
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

  function handleSaveData(key, value) {
    var formData = form.getFieldsValue();
    formData[key] = value;
    form.setFieldsValue(_objectSpread({}, formData));
    handleValuesChange((0, _defineProperty2["default"])({}, key, value), _objectSpread({}, formData));
  }

  function handleExpect(key) {
    if (Array.isArray(key)) {
      key.forEach(function (k) {
        return expectFieldRef.current[k] = true;
      });
    } else {
      expectFieldRef.current[key] = true;
    }
  }

  function handleValuesChange(changedValues, allValues) {
    if (!namespace) {
      console.warn('Parameter namespace is required');
    }

    var canReRender = Object.keys(changedValues).some(function (key) {
      return expectFieldRef.current[key];
    });

    if (canReRender) {
      forceUpdate();
    }

    (0, _Model.setPageData)(namespace, 'formData', allValues);
  }

  return {
    onFormatValue: formatValue,
    // 字段自己标记自己是否需要在提交之前 format
    handleFormatValue: handleFormatValue,
    // format 全部已标记字段
    onSaveOtherValue: handleSaveData,
    onGetFormData: handleGetFormData,
    onValuesChange: handleValuesChange,
    onExpect: handleExpect
  };
}