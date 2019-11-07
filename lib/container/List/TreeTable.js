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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

  var finalId = (0, _react.useRef)(null);
  var columns = (0, _format.formatTableFields)(fields, operation, _objectSpread({}, handle, {
    onRefresh: handleRefresh
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
    if (data.length) {
      setTreeData(formatTree(data));
    }
  }, [data]);

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

  function handleAppend(id) {
    finalId.current = id;
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
    if (finalId.current) {
      handleAppend(finalId.current);
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
    onExpand: handleExpand
  })));
}

function formatTree(data) {
  var stack = [];

  if (Array.isArray(data)) {
    stack.push.apply(stack, (0, _toConsumableArray2["default"])(data));
  } else {
    stack.push(data);
  }

  while (stack.length) {
    var item = stack.shift();

    if (item) {
      if (item.children) {
        stack.push.apply(stack, (0, _toConsumableArray2["default"])(item.children));
      } else {
        item.children = [];
      }
    }
  }

  return (0, _toConsumableArray2["default"])(data);
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