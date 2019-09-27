"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/spin/style/css");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/lib/tree/style/css");

var _tree = _interopRequireDefault(require("antd/lib/tree"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _react = _interopRequireWildcard(require("react"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _format = require("zero-element/lib/utils/format");

var _request = require("zero-element/lib/utils/request");

var _read = _interopRequireDefault(require("./read"));

var _findNode = _interopRequireDefault(require("./findNode"));

var _findNodes = _interopRequireDefault(require("./findNodes"));

var _checkData = _interopRequireDefault(require("./checkData"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Search = _input["default"].Search;

var _default = function _default(props) {
  var API = props.API,
      _props$searchField = props.searchField,
      searchField = _props$searchField === void 0 ? 'search' : _props$searchField,
      namespace = props.namespace,
      _props$initData = props.initData,
      initData = _props$initData === void 0 ? false : _props$initData,
      onChange = props.onChange,
      rest = (0, _objectWithoutProperties2["default"])(props, ["API", "searchField", "namespace", "initData", "onChange"]);

  var _useState = (0, _react.useState)(initData),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      treeData = _useState2[0],
      setTreeData = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      expandedKeys = _useState4[0],
      setExpandedKeys = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      autoExpandParent = _useState6[0],
      setAutoExpandParent = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      treeLoading = _useState8[0],
      setTreeLoading = _useState8[1];

  (0, _lifeCycle.useDidMount)(function (_) {
    if (API) {
      handleLoadInitData();
    }
  });

  function handleLoadInitData() {
    if (API.initAPI === undefined) {
      return false;
    }

    var api = (0, _format.formatAPI)(API.initAPI, {
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
      } else {
        throw new Error('服务器返回了非预期的数据格式');
      }
    })["catch"](function (err) {
      return console.warn('数据初始化失败', err);
    })["finally"](function (_) {
      return setTreeLoading(false);
    });
  }

  function handleLoadData(treeNode) {
    var id = treeNode.props.id;

    if (API.appendAPI === undefined) {
      return new Promise(function (res) {
        return res();
      });
      ;
    }

    var api = (0, _format.formatAPI)(API.appendAPI, {
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

        var find = (0, _findNode["default"])(id, treeData);
        find.children = find.children || [];

        (_find$children = find.children).push.apply(_find$children, (0, _toConsumableArray2["default"])((0, _checkData["default"])(rspData)));

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
    var id = selectedKeys[0];
    var find = (0, _findNode["default"])(id, treeData);
    onChange(_objectSpread({
      id: id
    }, find));
  }

  function handleLocalSearch(e) {
    var value = e.target.value;

    if (value) {
      var find = (0, _findNodes["default"])(value, treeData);
      setExpandedKeys(find.map(function (i) {
        return String(i.id);
      }));
      setAutoExpandParent(true);
    }
  }

  function handleRemoteSearch(value) {
    if (API.searchAPI === undefined) {
      return false;
    }

    var api = (0, _format.formatAPI)(API.searchAPI, {
      namespace: namespace
    });
    setTreeLoading(true);
    return (0, _request.query)(api, (0, _defineProperty2["default"])({}, searchField, value)).then(function (response) {
      var status = response.status,
          data = response.data;
      var code = data.code,
          rspData = data.data;

      if (status === 200 && code === 200) {
        var rst = (0, _checkData["default"])(rspData);

        if (rst) {
          rst.forEach(function (item) {
            var find = (0, _findNode["default"])(item.pid, treeData);
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

  var treeProps = _objectSpread({
    loadData: handleLoadData,
    onSelect: handleSelect
  }, rest);

  if (treeProps.expandedKeys === true) {
    treeData.expandedKeys = expandedKeys;
    treeData.onExpand = handleExpand;
  }

  return _react["default"].createElement(_spin["default"], {
    spinning: treeLoading
  }, _react["default"].createElement(Search, {
    style: {
      // marginTop: 16,
      marginBottom: 8
    },
    placeholder: "\u641C\u7D22",
    onChange: handleLocalSearch,
    onSearch: handleRemoteSearch
  }), treeData ? _react["default"].createElement(_tree["default"], (0, _extends2["default"])({
    showLine: true,
    autoExpandParent: autoExpandParent
  }, treeProps), (0, _read["default"])(treeData)) : null);
};

exports["default"] = _default;