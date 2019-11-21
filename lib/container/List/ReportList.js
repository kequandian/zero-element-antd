"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseList;

require("antd/lib/table/style/css");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _useBaseList = _interopRequireDefault(require("zero-element/lib/helper/list/useBaseList"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _format = require("./utils/format");

var _readConfig = require("../../utils/readConfig");

var _layout = require("zero-element-global/lib/layout");

var _useOperation3 = _interopRequireDefault(require("./utils/useOperation"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function BaseList(props) {
  var namespace = props.namespace,
      config = props.config,
      extraData = props.extraData,
      forceInitList = props.forceInitList;
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
      actionLayoutConfig = _config$actionLayoutC === void 0 ? {} : _config$actionLayoutC;
  var listProps = (0, _useBaseList["default"])({
    namespace: namespace,
    modelPath: 'listData',
    extraData: extraData
  }, config);

  var _useOperation = (0, _useOperation3["default"])(),
      _useOperation2 = (0, _slicedToArray2["default"])(_useOperation, 2),
      oData = _useOperation2[0],
      onClickOperation = _useOperation2[1];

  var loading = listProps.loading,
      data = listProps.data,
      handle = listProps.handle,
      modelStatus = listProps.modelStatus;
  var onGetList = handle.onGetList,
      onClearList = handle.onClearList;
  var listData = modelStatus.listData;
  var records = listData.records,
      pagination = (0, _objectWithoutProperties2["default"])(listData, ["records"]);
  var columns = (0, _format.formatTableFields)(fields, operation, _objectSpread({}, handle, {
    onClickOperation: onClickOperation
  }), {
    namespace: namespace,
    extraData: extraData
  });
  (0, _lifeCycle.useDidMount)(function (_) {
    if (API.listAPI) {
      onGetList({});
    }
  });
  (0, _lifeCycle.useWillUnmount)(onClearList);
  (0, _react.useEffect)(function (_) {
    if (forceInitList !== undefined && API.listAPI) {
      onGetList({});
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [forceInitList]);

  function handlePageChange(current, pageSize) {
    onGetList({
      current: current,
      pageSize: pageSize
    });
  }

  function handleRowClassName(record, index) {
    if (index % 2 === 1) {
      return 'ZEleA-table-odd';
    }
  }

  return _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: layout
  }, layoutConfig, {
    handle: handle,
    namespace: namespace
  }), _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: actionLayout
  }, actionLayoutConfig), actions.map(function (action, i) {
    return (0, _readConfig.getActionItem)(_objectSpread({
      key: i
    }, action), modelStatus, handle, {
      namespace: namespace,
      extraData: extraData
    });
  })), _react["default"].createElement(_table["default"], (0, _extends2["default"])({
    rowKey: "id",
    size: "middle",
    className: "ZEleA-ReportList",
    dataSource: props.data || data,
    columns: columns,
    loading: loading,
    rowClassName: handleRowClassName,
    pagination: _objectSpread({}, pagination, {
      onChange: handlePageChange // onShowSizeChange: handlePageChange,
      // showSizeChanger: true,

    })
  }, propsCfg)));
}