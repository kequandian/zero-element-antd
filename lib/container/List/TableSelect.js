"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TableSelect;

require("antd/lib/table/style/css");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _layout = require("zero-element-global/lib/layout");

var _useListHandle3 = _interopRequireDefault(require("./utils/useListHandle"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function TableSelect(props) {
  var namespace = props.namespace,
      config = props.config,
      extraData = props.extraData,
      options = props.options,
      value = props.value,
      onChange = props.onChange;
  var _config$layout = config.layout,
      layout = _config$layout === void 0 ? 'Empty' : _config$layout,
      _config$layoutConfig = config.layoutConfig,
      layoutConfig = _config$layoutConfig === void 0 ? {} : _config$layoutConfig,
      _config$props = config.props,
      propsCfg = _config$props === void 0 ? {} : _config$props,
      _config$actionLayout = config.actionLayout,
      actionLayout = _config$actionLayout === void 0 ? 'Row' : _config$actionLayout,
      _config$actionLayoutC = config.actionLayoutConfig,
      actionLayoutConfig = _config$actionLayoutC === void 0 ? {} : _config$actionLayoutC;
  var _options$type = options.type,
      type = _options$type === void 0 ? 'checkbox' : _options$type,
      _options$value = options.value,
      optValue = _options$value === void 0 ? 'id' : _options$value,
      requireValid = options.requireValid,
      _options$pagination = options.pagination,
      pagination = _options$pagination === void 0 ? false : _options$pagination;

  var _useListHandle = (0, _useListHandle3["default"])({
    namespace: namespace,
    extraData: extraData,
    config: config,
    props: props
  }),
      _useListHandle2 = (0, _slicedToArray2["default"])(_useListHandle, 5),
      tableProps = _useListHandle2[0],
      tableData = _useListHandle2[1],
      handle = _useListHandle2[2],
      actionsItems = _useListHandle2[3],
      operationData = _useListHandle2[4].operationData;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      selectedRowKeys = _useState2[0],
      setSelectedRowKeys = _useState2[1];

  (0, _react.useEffect)(function (_) {
    if (Array.isArray(value)) {
      setSelectedRowKeys(value.map(function (item) {
        return item[optValue];
      }));
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [value]);

  function handleRowClassName(record) {
    if (operationData.id === record.id) {
      return 'ZEleA-table-selected';
    }
  }

  function handleChange(selectedRowKeys, selectedRows) {
    setSelectedRowKeys(selectedRowKeys);
    onChange(selectedRows);
  }

  function handleDisabled(record) {
    var valid = record && record[optValue] !== 0 && Boolean(record[optValue]);
    return {
      disabled: !valid
    };
  }

  return _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: layout
  }, layoutConfig, {
    handle: handle,
    namespace: namespace
  }), _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: actionLayout
  }, actionLayoutConfig), actionsItems), _react["default"].createElement(_table["default"], (0, _extends2["default"])({
    rowKey: optValue,
    size: "small",
    bordered: false,
    rowClassName: handleRowClassName,
    dataSource: props.data || tableData
  }, tableProps, propsCfg, {
    pagination: pagination ? _objectSpread({}, tableProps.pagination, {
      size: 'small'
    }) : false,
    rowSelection: {
      type: type,
      selectedRowKeys: selectedRowKeys,
      onChange: handleChange,
      getCheckboxProps: requireValid ? handleDisabled : undefined
    }
  })));
}