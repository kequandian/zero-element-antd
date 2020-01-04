"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ItemList;

require("antd/lib/pagination/style/css");

var _pagination = _interopRequireDefault(require("antd/lib/pagination"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _layout = require("zero-element-global/lib/layout");

var _useListHandle3 = _interopRequireDefault(require("./utils/useListHandle"));

function ItemList(props) {
  var namespace = props.namespace,
      config = props.config,
      extraData = props.extraData,
      Item = props.Item;
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
      operationData = _useListHandle2[4].operationData;

  if (typeof Item !== 'function') {
    console.warn('请在 props 里传入 Item');
    return '未提供有效的 Item';
  }

  var listData = props.data || tableData || [];
  return _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: layout
  }, layoutConfig, {
    handle: handle,
    namespace: namespace
  }), _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: actionLayout
  }, actionLayoutConfig), actionsItems), _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: "Items"
  }, layoutConfig, {
    handle: handle,
    namespace: namespace
  }), listData.map(function (item, i) {
    return _react["default"].createElement(Item, (0, _extends2["default"])({
      key: item.id
    }, tableProps, propsCfg, {
      index: i,
      data: item,
      handle: handle
    }));
  })), _react["default"].createElement("br", null), _react["default"].createElement(_pagination["default"], tableProps.pagination));
}