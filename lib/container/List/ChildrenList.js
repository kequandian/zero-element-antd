"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ChildrenList;

require("antd/lib/table/style/css");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _useBaseChildren = _interopRequireDefault(require("zero-element/lib/helper/form/useBaseChildren"));

var _format = require("./utils/format");

var _readConfig = require("../../utils/readConfig");

var _layout = require("zero-element/lib/config/layout");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ChildrenList(props) {
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
      actionLayout = _config$actionLayout === void 0 ? 'Row' : _config$actionLayout,
      _config$actionLayoutC = config.actionLayoutConfig,
      actionLayoutConfig = _config$actionLayoutC === void 0 ? {} : _config$actionLayoutC,
      _config$itemsField = config.itemsField,
      itemsField = _config$itemsField === void 0 ? 'items' : _config$itemsField;
  var childrenProps = (0, _useBaseChildren["default"])({
    namespace: namespace,
    modelPath: 'formData',
    itemsPath: itemsField
  }, config);
  var data = childrenProps.data,
      handle = childrenProps.handle,
      model = childrenProps.model;
  var onCreate = handle.onCreate,
      onCreateList = handle.onCreateList,
      onEdit = handle.onEdit;

  var _formatTableFields = (0, _format.formatTableFields)(fields, operation, handle),
      columns = _formatTableFields.columns;

  return /*#__PURE__*/_react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: layout
  }, layoutConfig), /*#__PURE__*/_react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: actionLayout
  }, actionLayoutConfig), actions.map(function (action, i) {
    return (0, _readConfig.getActionItem)(_objectSpread({
      key: i
    }, action, {
      onCreate: onCreate,
      onCreateList: onCreateList,
      onEdit: onEdit
    }), model, {}, {
      namespace: namespace
    });
  })), /*#__PURE__*/_react["default"].createElement(_table["default"], (0, _extends2["default"])({
    rowKey: function rowKey(row) {
      return String(row._id || row.id);
    },
    dataSource: data,
    columns: columns
  }, propsCfg)));
}