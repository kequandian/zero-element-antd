"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AutoReport;

require("antd/lib/table/style/css");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _layout = require("zero-element-global/lib/layout");

var _useBaseList = _interopRequireDefault(require("zero-element/lib/helper/list/useBaseList"));

var _readConfig = require("../../utils/readConfig");

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _format = require("./utils/format");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function AutoReport(props) {
  var namespace = props.namespace,
      config = props.config,
      extraData = props.extraData;
  var API = config.API,
      _config$layout = config.layout,
      layout = _config$layout === void 0 ? 'Empty' : _config$layout,
      _config$layoutConfig = config.layoutConfig,
      layoutConfig = _config$layoutConfig === void 0 ? {} : _config$layoutConfig,
      _config$props = config.props,
      propsCfg = _config$props === void 0 ? {} : _config$props,
      actions = config.actions,
      _config$actionLayout = config.actionLayout,
      actionLayout = _config$actionLayout === void 0 ? 'Row' : _config$actionLayout,
      _config$actionLayoutC = config.actionLayoutConfig,
      actionLayoutConfig = _config$actionLayoutC === void 0 ? {} : _config$actionLayoutC,
      operation = config.operation,
      pageSize = config.pageSize;
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
  var listData = modelStatus.listData;
  var rows = listData.rows,
      header = listData.header,
      columns = listData.columns,
      pagination = (0, _objectWithoutProperties2["default"])(listData, ["rows", "header", "columns"]);

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      tColumns = _useState2[0],
      setTColumns = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      records = _useState4[0],
      setRecords = _useState4[1];

  (0, _lifeCycle.useDidMount)(function (_) {
    if (API.listAPI) {
      onGetList({
        pageSize: pageSize
      });
    }
  });
  (0, _react.useEffect)(function (_) {
    if (Array.isArray(header) && Array.isArray(columns) && Array.isArray(rows)) {
      var _formatTableFields = (0, _format.formatTableFields)(formatColumns(header, columns), operation, _objectSpread({}, handle), {
        namespace: namespace,
        extraData: extraData
      }),
          rst = _formatTableFields.columns;

      setTColumns(rst);
      setRecords(rows.map(function (item, i) {
        return _objectSpread({
          id: i
        }, item);
      }));
    }
  }, [rows, header, columns]);
  (0, _lifeCycle.useWillUnmount)(onClearList);
  var actionsItems = actions.map(function (action, i) {
    return (0, _readConfig.getActionItem)(_objectSpread({
      key: i
    }, action), modelStatus, handle, {
      namespace: namespace,
      extraData: extraData,
      config: config
    });
  });

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
  }, actionLayoutConfig), actionsItems), _react["default"].createElement(_table["default"], (0, _extends2["default"])({
    rowKey: "id",
    size: "middle",
    className: "ZEleA-ReportList",
    rowClassName: handleRowClassName,
    columns: tColumns,
    dataSource: records,
    loading: loading,
    pagination: _objectSpread({
      showSizeChanger: true
    }, pagination, {
      onChange: handlePageChange,
      onShowSizeChange: handlePageChange
    })
  }, propsCfg)));
}
/**
 * 返回 标准 columns
 * @param {array} titleList 
 * @param {array} typeList 
 */


function formatColumns(titleList, typeList) {
  var rst = [];
  titleList.forEach(function (title, i) {
    rst.push(_objectSpread({
      label: title,
      field: title
    }, typeMap[typeList[i]]));
  });
  return rst;
}

var typeMap = {
  'D': {
    // 金钱
    valueType: 'currency',
    align: 'right',
    options: {
      nullPlaceholder: '-'
    }
  },
  'T': {},
  // 时间
  'P': {
    // 百分比
    valueType: 'percentage',
    align: 'right',
    options: {
      nullPlaceholder: '-'
    }
  },
  'C': {
    // 数量
    align: 'right'
  },
  'S': {} // 字符串

};