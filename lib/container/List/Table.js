"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseTable;

require("antd/lib/table/style/css");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _layout = require("zero-element/lib/config/layout");

var _useListHandle3 = _interopRequireDefault(require("./utils/useListHandle"));

var _TableFooter = _interopRequireDefault(require("./components/TableFooter"));

var _canPortal = _interopRequireDefault(require("../../utils/canPortal"));

function BaseTable(props) {
  var namespace = props.namespace,
      config = props.config,
      extraData = props.extraData,
      extraEl = props.extraEl;
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
      _useListHandle2$ = _useListHandle2[4],
      operationData = _useListHandle2$.operationData,
      renderBatchOperation = _useListHandle2$.renderBatchOperation;

  function handleRowClassName(record) {
    if (operationData.id === record.id) {
      return 'ZEleA-table-selected';
    }
  }

  return /*#__PURE__*/_react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: layout
  }, layoutConfig, {
    handle: handle,
    namespace: namespace
  }), (0, _canPortal["default"])(extraEl, /*#__PURE__*/_react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: actionLayout
  }, actionLayoutConfig), renderBatchOperation(), actionsItems)), /*#__PURE__*/_react["default"].createElement(_table["default"], (0, _extends2["default"])({
    rowKey: "id",
    size: "middle",
    rowClassName: handleRowClassName,
    dataSource: props.data || tableData
  }, tableProps, propsCfg, {
    footer: (0, _TableFooter["default"])(props.data || tableData, tableProps.columns)
  })));
}