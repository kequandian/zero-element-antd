"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseChildren;

require("antd/lib/table/style/css");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _useBaseChildren = _interopRequireDefault(require("zero-element/lib/helper/form/useBaseChildren"));

var _format = require("./utils/format");

var _readConfig = require("../../utils/readConfig");

var _layout = require("zero-element-global/lib/layout");

function BaseChildren(props) {
  var namespace = props.namespace,
      config = props.config;
  var _config$layout = config.layout,
      layout = _config$layout === void 0 ? 'Empty' : _config$layout,
      fields = config.fields,
      operation = config.operation,
      _config$actions = config.actions,
      actions = _config$actions === void 0 ? [] : _config$actions,
      _config$props = config.props,
      propsCfg = _config$props === void 0 ? {} : _config$props,
      _config$layoutConfig = config.layoutConfig,
      layoutConfig = _config$layoutConfig === void 0 ? {} : _config$layoutConfig,
      _config$actionLayout = config.actionLayout,
      actionLayout = _config$actionLayout === void 0 ? 'Empty' : _config$actionLayout,
      _config$actionLayoutC = config.actionLayoutConfig,
      actionLayoutConfig = _config$actionLayoutC === void 0 ? {} : _config$actionLayoutC;
  var childrenProps = (0, _useBaseChildren["default"])({
    namespace: namespace,
    modelPath: 'formData'
  }, config);
  var data = childrenProps.data,
      handle = childrenProps.handle,
      modelStatus = childrenProps.modelStatus;
  var onCreate = handle.onCreate;
  var columns = (0, _format.formatTableFields)(fields, operation, handle);
  return _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: layout
  }, layoutConfig), _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: actionLayout
  }, actionLayoutConfig), actions.map(function (action, i) {
    return (0, _readConfig.getActionItem)((0, _objectSpread2["default"])({
      key: i
    }, action, {
      onCreate: onCreate
    }), modelStatus, namespace);
  })), _react["default"].createElement(_table["default"], (0, _extends2["default"])({
    rowKey: function rowKey(row) {
      return row._id || row.id;
    },
    dataSource: data,
    columns: columns
  }, propsCfg)));
}