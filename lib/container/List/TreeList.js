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

require("antd/lib/spin/style/css");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("antd/lib/tree/style/css");

var _tree = _interopRequireDefault(require("antd/lib/tree"));

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _react = _interopRequireWildcard(require("react"));

var _useBaseList = _interopRequireDefault(require("zero-element/lib/helper/list/useBaseList"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _format = require("./utils/format");

var _readConfig = require("../../utils/readConfig");

var _layout = require("zero-element-global/lib/layout");

var _format2 = require("zero-element/lib/utils/format");

var _request = require("zero-element/lib/utils/request");

var _layoutFlex = require("layout-flex");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Search = _input["default"].Search;
var TreeNode = _tree["default"].TreeNode;
var FlexItem = _layoutFlex.Flex.FlexItem;

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

  var _useState3 = (0, _react.useState)({}),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      treeData = _useState4[0],
      setTreeData = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      expandedKeys = _useState6[0],
      setExpandedKeys = _useState6[1];

  var _useState7 = (0, _react.useState)(true),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      autoExpandParent = _useState8[0],
      setAutoExpandParent = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = (0, _slicedToArray2["default"])(_useState9, 2),
      treeLoading = _useState10[0],
      setTreeLoading = _useState10[1];

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
  var columns = (0, _format.formatTableFields)(fields, operation, handle);
  (0, _lifeCycle.useDidMount)(function (_) {
    if (API.listAPI) {
      if (API.listAPI.indexOf('<') === -1) {
        onGetList({});
      } else {
        if (treeAPI) {
          handleLoadInitData();
        }
      }
    }
  });
  (0, _react.useEffect)(function (_) {
    if (extraData.id) {
      onGetList({});
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [extraData]);
  (0, _lifeCycle.useWillUnmount)(onClearList);

  function handleLoadInitData() {
    var api = (0, _format2.formatAPI)(treeAPI.initAPI, {
      namespace: namespace
    });
    setTreeLoading(true);
    (0, _request.query)(api).then(function (response) {
      var status = response.status,
          data = response.data;
      var code = data.code,
          rspData = data.data;

      if (status === 200 && code === 200) {
        setTreeData(rspData);
      }
    })["catch"](function (err) {
      return console.warn('数据初始化失败', err);
    })["finally"](function (_) {
      return setTreeLoading(false);
    });
  }

  function handleLoadData(treeNode) {
    var id = treeNode.props.id;
    var api = (0, _format2.formatAPI)(treeAPI.appendAPI, {
      namespace: namespace,
      data: {
        id: id
      }
    });
    setTreeLoading(true);
    return (0, _request.query)(api).then(function (response) {
      var status = response.status,
          data = response.data;
      var code = data.code,
          rspData = data.data;

      if (status === 200 && code === 200) {
        var _find$children;

        var find = findNode(id, treeData);
        find.children = find.children || [];

        (_find$children = find.children).push.apply(_find$children, (0, _toConsumableArray2["default"])(checkData(rspData)));

        setTreeData(_objectSpread({}, treeData));
      }
    })["catch"](function (err) {
      return console.warn('子项获取失败', err);
    })["finally"](function (_) {
      return setTreeLoading(false);
    });
  }

  function handleExpand(expandedKeys) {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  }

  function handleSelect(selectedKeys) {
    setExtraData({
      id: selectedKeys[0]
    });
  }

  function handleLocalSearch(e) {
    var value = e.target.value;

    if (value) {
      var find = findNodes(value, treeData);
      setExpandedKeys(find.map(function (i) {
        return String(i.id);
      }));
      setAutoExpandParent(true);
    }
  }

  function handleRemoteSearch(value) {
    var api = (0, _format2.formatAPI)(treeAPI.searchAPI, {
      namespace: namespace
    });
    setTreeLoading(true);
    return (0, _request.query)(api, (0, _defineProperty2["default"])({}, searchField, value)).then(function (response) {
      var status = response.status,
          data = response.data;
      var code = data.code,
          rspData = data.data;

      if (status === 200 && code === 200) {
        var rst = checkData(rspData);

        if (rst) {
          rst.forEach(function (item) {
            var find = findNode(item.pid, treeData);
            find.children = find.children || [];
            find.children.push(item);
          });
        }

        setTreeData(_objectSpread({}, treeData)); // 构造一个对象，而不使用 react 的合成事件

        handleLocalSearch({
          target: {
            value: value
          }
        });
      }
    })["catch"](function (err) {
      return console.warn('搜索失败', err);
    })["finally"](function (_) {
      return setTreeLoading(false);
    });
  }

  function renderTree() {
    return _react["default"].createElement(FlexItem, null, _react["default"].createElement(_spin["default"], {
      spinning: treeLoading
    }, _react["default"].createElement(Search, {
      style: {
        marginTop: 16,
        marginBottom: 8
      },
      placeholder: "\u641C\u7D22",
      onChange: handleLocalSearch,
      onSearch: handleRemoteSearch
    }), _react["default"].createElement(_tree["default"], {
      showLine: true,
      autoExpandParent: autoExpandParent,
      expandedKeys: expandedKeys,
      loadData: handleLoadData,
      onExpand: handleExpand,
      onSelect: handleSelect
    }, read(treeData))));
  }

  return _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: layout
  }, layoutConfig), _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: actionLayout
  }, actionLayoutConfig), actions.map(function (action, i) {
    return (0, _readConfig.getActionItem)(_objectSpread({
      key: i
    }, action), modelStatus, namespace, handle);
  })), _react["default"].createElement(_layoutFlex.Flex, {
    align: "flex-start"
  }, treeAPI ? renderTree() : null, _react["default"].createElement(FlexItem, {
    flex: 1
  }, _react["default"].createElement(_table["default"], (0, _extends2["default"])({
    rowKey: "id",
    dataSource: props.data || data,
    columns: columns,
    loading: loading,
    childrenColumnName: field
  }, propsCfg)))));
}
/**
 * 读取后台返回的扁平数据, 从数据中找到所需的数组数据
 * @param {array} rspData 后台返回的 response 的数据
 * @returns {array} listData 返回数组数据
 */


function checkData(rspData) {
  var listData = Array.isArray(rspData) ? rspData : Array.isArray(rspData.records) ? rspData.records : rspData.children;

  if (!Array.isArray(listData)) {
    throw new Error('后台未返回预期数据格式');
  }

  return listData;
}
/**
 * 把扁平的数组根据 pid 格式化为树状
 * 
 * @param {array} list 扁平的数组
 * @returns {array} tree 树状结构
 */


function formatToTree(list) {
  var rst = [];
  var IDRecords = {};
  var cloneList = list.map(function (item) {
    var clone = _objectSpread({}, item, {
      key: item.id
    });

    IDRecords[item.id] = clone;
    return clone;
  });
  cloneList.forEach(function (node) {
    var parentNode = IDRecords[node.pid];

    if (parentNode) {
      parentNode.children = parentNode.children || [];
      parentNode.children.push(node);
    } else {
      rst.push(node);
      v;
    }
  });
  return rst;
}
/**
 * 渲染树状数据
 *
 * @param {array|object} item 数组或对象
 * @returns react node
 */


function read(item) {
  if (Array.isArray(item)) {
    return item.map(function (i) {
      return read(i);
    });
  }

  if (item.children) {
    return _react["default"].createElement(TreeNode, {
      key: item.id,
      id: item.id,
      title: item.title
    }, read(item.children));
  }

  return _react["default"].createElement(TreeNode, {
    key: item.id,
    id: item.id,
    title: item.title
  });
}
/**
 * 根据 id 找到节点
 *
 * @param {string} id
 * @param {object} treeData
 * @returns object node
 */


function findNode(id, treeData) {
  var stack = [treeData];
  var rst;

  while (stack.length) {
    var item = stack.shift();

    if (item.id === id) {
      rst = item;
      break;
    }

    if (Array.isArray(item.children)) {
      stack.push.apply(stack, (0, _toConsumableArray2["default"])(item.children));
    }
  }

  return rst;
}

function findNodes(value, treeData) {
  var stack = [treeData];
  var rst = [];

  while (stack.length) {
    var item = stack.shift();
    var _item$title = item.title,
        title = _item$title === void 0 ? '' : _item$title,
        children = item.children;

    if (title.indexOf(value) > -1) {
      rst.push(item);
    }

    if (Array.isArray(children)) {
      stack.push.apply(stack, (0, _toConsumableArray2["default"])(children));
    }
  }

  return rst;
}