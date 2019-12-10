"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TreeList;

require("antd/lib/table/style/css");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _useBaseList = _interopRequireDefault(require("zero-element/lib/helper/list/useBaseList"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _format = require("./utils/format");

var _readConfig = require("../../utils/readConfig");

var _layout = require("zero-element-global/lib/layout");

var _layoutFlex = require("layout-flex");

var _Tree = _interopRequireDefault(require("../../components/Tree"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var FlexItem = _layoutFlex.Flex.FlexItem;
/**
 * 左边是一个树状选择，右边是 Table
 */

function TreeList(props) {
  var namespace = props.namespace,
      config = props.config;
  var _config$layout = config.layout,
      layout = _config$layout === void 0 ? 'Empty' : _config$layout,
      _config$layoutConfig = config.layoutConfig,
      layoutConfig = _config$layoutConfig === void 0 ? {} : _config$layoutConfig,
      _config$API = config.API,
      API = _config$API === void 0 ? {} : _config$API,
      fields = config.fields,
      operation = config.operation,
      _config$actions = config.actions,
      actions = _config$actions === void 0 ? [] : _config$actions,
      _config$props = config.props,
      propsCfg = _config$props === void 0 ? {} : _config$props,
      _config$actionLayout = config.actionLayout,
      actionLayout = _config$actionLayout === void 0 ? 'Empty' : _config$actionLayout,
      _config$actionLayoutC = config.actionLayoutConfig,
      actionLayoutConfig = _config$actionLayoutC === void 0 ? {} : _config$actionLayoutC,
      _config$field = config.field,
      field = _config$field === void 0 ? 'children' : _config$field,
      _config$tree = config.tree,
      tree = _config$tree === void 0 ? {} : _config$tree;
  var treeAPI = tree.API,
      _tree$searchField = tree.searchField,
      searchField = _tree$searchField === void 0 ? 'search' : _tree$searchField;

  var _useState = (0, _react.useState)({}),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      extraData = _useState2[0],
      setExtraData = _useState2[1];

  var listProps = (0, _useBaseList["default"])({
    namespace: namespace,
    modelPath: 'listData',
    extraData: extraData
  }, config);
  var loading = listProps.loading,
      data = listProps.data,
      handle = listProps.handle,
      modelStatus = listProps.modelStatus;
  var onGetList = handle.onGetList,
      onClearList = handle.onClearList;
  var columns = (0, _format.formatTableFields)(fields, operation, handle, {
    namespace: namespace,
    extraData: extraData
  });
  (0, _lifeCycle.useDidMount)(function (_) {
    if (API.listAPI) {
      if (API.listAPI.indexOf('<') === -1) {
        onGetList({});
      }
    }
  });
  (0, _react.useEffect)(function (_) {
    if (extraData.id) {
      onGetList({});
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [extraData]);
  (0, _lifeCycle.useWillUnmount)(onClearList);

  function handleSelect(data) {
    setExtraData(data);
  }

  return _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: layout
  }, layoutConfig), _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: actionLayout
  }, actionLayoutConfig), actions.map(function (action, i) {
    return (0, _readConfig.getActionItem)(_objectSpread({
      key: i
    }, action), modelStatus, handle, {
      namespace: namespace,
      extraData: extraData
    });
  })), _react["default"].createElement(_layoutFlex.Flex, {
    align: "flex-start"
  }, treeAPI ? _react["default"].createElement(FlexItem, null, _react["default"].createElement(_Tree["default"], {
    API: treeAPI,
    searchField: searchField,
    namespace: namespace,
    onChange: handleSelect
  })) : null, _react["default"].createElement(FlexItem, {
    flex: 1
  }, _react["default"].createElement(_table["default"], (0, _extends2["default"])({
    rowKey: "id",
    dataSource: props.data || data,
    columns: columns,
    loading: loading,
    childrenColumnName: field
  }, propsCfg)))));
}