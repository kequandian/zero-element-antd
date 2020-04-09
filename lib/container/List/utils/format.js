"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTableFields = formatTableFields;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _ListOperation = _interopRequireDefault(require("../components/ListOperation"));

var _ListFieldsEdit = _interopRequireDefault(require("../components/ListFieldsEdit"));

var _valueType = require("zero-element-global/lib/valueType");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 *
 * 统一 Table columns 的格式
 * @export
 * @param {array} fields 标准化的 fields
 * @param {array} operation 对该行的操作
 * @param {object} handle 传递给 ListOperation
 * @param {object} props 传递给 valueType 与 ListOperation
 * @returns antd Table columns 和 sum width
 */
function formatTableFields() {
  var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var operation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var handle = arguments.length > 2 ? arguments[2] : undefined;
  var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var operationCfg = {};
  var width = 0;
  var operationObj;
  var rst = fields.map(function (fieldCfg, i) {
    var field = fieldCfg.field,
        label = fieldCfg.label,
        valueType = fieldCfg.valueType,
        _fieldCfg$render = fieldCfg.render,
        render = _fieldCfg$render === void 0 ? valueTypeRender(valueType, fieldCfg, props, handle) : _fieldCfg$render,
        rest = (0, _objectWithoutProperties2["default"])(fieldCfg, ["field", "label", "valueType", "render"]);

    if (field === 'operation') {
      operationCfg = fieldCfg;
      return {};
    }

    if (typeof rest.width === 'number') {
      width += rest.width;
    }

    return _objectSpread({
      dataIndex: field,
      title: label,
      render: render
    }, rest);
  }).filter(function (fieldCfg) {
    return fieldCfg.dataIndex;
  });

  if (operation.length > 0) {
    operationObj = _objectSpread({
      dataIndex: 'operation',
      align: 'right'
    }, width > 0 ? {
      fixed: 'right',
      width: 100
    } : {}, {}, operationCfg, {
      // fixed  width
      title: handle.onFieldsOrder ? function () {
        return _react["default"].createElement(_ListFieldsEdit["default"], {
          fields: props.fields,
          handle: handle
        });
      } : '操作',
      render: function render(text, record, index) {
        return _react["default"].createElement(_ListOperation["default"], (0, _extends2["default"])({}, props, {
          text: text,
          record: record,
          index: index,
          operation: operation,
          handle: handle
        }));
      }
    }); // rst.push(operationObj);
  }

  return {
    columns: [].concat((0, _toConsumableArray2["default"])(rst), [operationObj]),
    width: width
  };
}

function valueTypeRender(type, config, props, handle) {
  if (!type) return undefined;
  return function (text, record, index) {
    return _react["default"].createElement(_valueType.Render, (0, _extends2["default"])({
      n: type
    }, config, props, {
      data: {
        text: text,
        record: record,
        index: index,
        type: type
      },
      handle: handle
    }));
  };
}