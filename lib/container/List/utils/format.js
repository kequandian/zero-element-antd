"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatTableFields = formatTableFields;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _ListOperation = _interopRequireDefault(require("../components/ListOperation"));

var _valueType = require("zero-element-global/lib/valueType");

// import ListFieldsEdit from '../components/ListFieldsEdit';

/**
 *
 * 统一 Table columns 的格式
 * @export
 * @param {array} fields 标准化的 fields
 * @param {array} operation 对该行的操作
 * @returns antd Table columns
 */
function formatTableFields() {
  var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var operation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var handle = arguments.length > 2 ? arguments[2] : undefined;
  var operationCfg = {};
  var rst = fields.map(function (fieldCfg, i) {
    var field = fieldCfg.field,
        label = fieldCfg.label,
        valueType = fieldCfg.valueType,
        _fieldCfg$render = fieldCfg.render,
        render = _fieldCfg$render === void 0 ? valueTypeRender(valueType, fieldCfg) : _fieldCfg$render,
        rest = (0, _objectWithoutProperties2["default"])(fieldCfg, ["field", "label", "valueType", "render"]);

    if (field === 'operation') {
      operationCfg = fieldCfg;
      return {};
    }

    return (0, _objectSpread2["default"])({
      dataIndex: field,
      title: label,
      render: render
    }, rest);
  }).filter(function (fieldCfg) {
    return fieldCfg.dataIndex;
  });

  if (operation.length > 0) {
    rst.push((0, _objectSpread2["default"])({
      dataIndex: 'operation',
      align: 'right'
    }, operationCfg, {
      // fixed  width
      title: '操作',
      // title: ListFieldsEdit,
      render: function render(text, record, index) {
        return _react["default"].createElement(_ListOperation["default"], {
          text: text,
          record: record,
          index: index,
          operation: operation,
          handle: handle
        });
      }
    }));
  }

  return rst;
}

function valueTypeRender(type, config) {
  if (!type) return undefined;
  return function (text, record, index) {
    return _react["default"].createElement(_valueType.Render, (0, _extends2["default"])({
      n: type
    }, config, {
      data: {
        text: text,
        record: record,
        index: index,
        type: type
      }
    }));
  };
}