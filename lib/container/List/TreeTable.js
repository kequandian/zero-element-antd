"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TreeTable;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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

var _format2 = require("zero-element/lib/utils/format");

var _request = require("../../utils/request");

var _useOperation3 = _interopRequireDefault(require("./utils/useOperation"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * 在原有 Table 的基础上，可通过点击 '＋' 来加载子项
 * 接收 扁平列表数据
 * 渲染之前, 会自动根据 pid 格式化为 树状
 *
 */
function TreeTable(props) {
  var namespace = props.namespace,
      config = props.config,
      extraData = props.extraData;
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
  var handle = listProps.handle,
      data = listProps.data,
      modelStatus = listProps.modelStatus;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      treeData = _useState2[0],
      setTreeData = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      expandedRowKeys = _useState6[0],
      setExpandedRowKeys = _useState6[1];

  var _useOperation = (0, _useOperation3["default"])(),
      _useOperation2 = (0, _slicedToArray2["default"])(_useOperation, 2),
      oData = _useOperation2[0],
      onClickOperation = _useOperation2[1];

  var columns = (0, _format.formatTableFields)(fields, operation, _objectSpread({}, handle, {
    onRefresh: handleRefresh,
    onClickOperation: onClickOperation
  }), {
    namespace: namespace,
    extraData: extraData
  });
  (0, _lifeCycle.useDidMount)(function (_) {
    if (API.listAPI) {
      handleInitData({});
    }
  });
  (0, _react.useEffect)(function (_) {
    if (data) {
      setTreeData(formatTree(data));
      setExpandedRowKeys([]);
    }
  }, [data]);
  (0, _react.useEffect)(function (_) {
    var _ref = treeData[0] || {},
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children;

    if (treeData.length === 1 && expandedRowKeys.length === 0 && children.length === 0) {
      handleAppend(treeData[0].id);
      setExpandedRowKeys([treeData[0].id]);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [treeData, expandedRowKeys]);

  function handleInitData() {
    var api = (0, _format2.formatAPI)(API.listAPI, {
      namespace: namespace
    });
    setLoading(true);
    (0, _request.query)(api).then(function (data) {
      return setTreeData(formatTree(data));
    })["catch"](function (err) {
      return console.warn('数据初始化失败', err);
    })["finally"](function (_) {
      return setLoading(false);
    });
  }

  function handleExpand(expanded, record) {
    if (expanded && API.appendAPI) {
      handleAppend(record.id);
    }
  }

  function handleExpandedChange(keys) {
    setExpandedRowKeys(keys);
  }

  function handleAppend(id) {
    if (!API.appendAPI) return false;
    var api = API.appendAPI.replace(/(\<\w+\>)/, id);
    setLoading(true);
    (0, _request.query)(api).then(function (data) {
      return setTreeData(formatTree(appendNode(id, treeData, data)));
    })["catch"](function (err) {
      return console.warn('数据初始化失败', err);
    })["finally"](function (_) {
      return setLoading(false);
    });
  }

  function handleRefresh() {
    if (expandedRowKeys.includes(oData.pid)) {
      handleAppend(oData.pid);
    } else {
      handleInitData();
      setExpandedRowKeys([]);
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
    dataSource: treeData,
    columns: columns,
    loading: loading,
    pagination: false
  }, propsCfg, {
    expandedRowKeys: expandedRowKeys,
    onExpand: handleExpand,
    onExpandedRowsChange: handleExpandedChange
  })));
}
/**
 * 为数据加上 children = [] 属性
 * 格式化数据为 树状
 * @param {} data 
 */


function formatTree(data) {
  var stack = [];

  if (Array.isArray(data)) {
    stack.push.apply(stack, (0, _toConsumableArray2["default"])(data));
  } else {
    stack.push(data);
  }

  var record = {};
  var rst = [];

  while (stack.length) {
    var item = stack.shift();

    if (item && item.id) {
      record[item.id] = item;

      if (item.children) {
        stack.push.apply(stack, (0, _toConsumableArray2["default"])(item.children));
      } else {
        item.children = [];
      }

      if (item.pid && record[item.pid]) {
        record[item.pid].children.push(item);
      } else {
        rst.push(item);
      }
    }
  }

  return [].concat(rst);
}

function appendNode(id, tree, data) {
  var stack = (0, _toConsumableArray2["default"])(tree);
  var target;

  while (stack.length) {
    var item = stack.shift();

    if (item.id === id) {
      target = item;
      break;
    }

    if (item.children) {
      stack.push.apply(stack, (0, _toConsumableArray2["default"])(item.children));
    }
  }

  if (target) {
    target.children = data;
  }

  return (0, _toConsumableArray2["default"])(tree);
}