"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TableSelect;

require("antd/lib/spin/style/css");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/lib/table/style/css");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _react = _interopRequireWildcard(require("react"));

var _format = require("../../container/List/utils/format");

var _format2 = require("zero-element/lib/utils/format");

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _request = require("../../utils/request");

var Search = _input["default"].Search;

function TableSelect(props) {
  var name = props.name,
      className = props.className,
      value = props.value,
      options = props.options,
      namespace = props.namespace,
      onChange = props.onChange,
      handle = props.handle,
      rest = (0, _objectWithoutProperties2["default"])(props, ["name", "className", "value", "options", "namespace", "onChange", "handle"]);
  var API = options.API,
      fields = options.fields,
      _options$type = options.type,
      type = _options$type === void 0 ? 'checkbox' : _options$type,
      _options$value = options.value,
      optValue = _options$value === void 0 ? 'id' : _options$value,
      requireValid = options.requireValid,
      _options$pagination = options.pagination,
      pagination = _options$pagination === void 0 ? false : _options$pagination;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      data = _useState4[0],
      setData = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      selectedRowKeys = _useState6[0],
      setSelectedRowKeys = _useState6[1];

  (0, _react.useEffect)(function (_) {
    if (Array.isArray(value)) {
      setSelectedRowKeys(value.map(function (item) {
        return item[optValue];
      }));
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [value]);
  var columns = (0, _format.formatTableFields)(fields, [], {}, {
    namespace: namespace
  });
  (0, _lifeCycle.useDidMount)(function (_) {
    if (API) {
      handleQueryData();
    }
  });

  function handleQueryData(queryData) {
    var fAPI = (0, _format2.formatAPI)(API, {
      namespace: namespace
    });
    setLoading(true);
    (0, _request.query)(fAPI, queryData).then(function (data) {
      var list = [];

      if (Array.isArray(data)) {
        list = data;
      } else if (Array.isArray(data.records)) {
        list = data.records;
      } else {
        console.warn("api \u8FD4\u56DE\u7684\u6570\u636E\u5E76\u975E\u9884\u671F\u7684\u5217\u8868\u7ED3\u6784 ".concat(data));
      }

      setData(list);
    })["finally"](function (_) {
      setLoading(false);
    });
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

  function handleSearch(value) {
    handleQueryData({
      search: value
    });
  }

  return _react["default"].createElement(_spin["default"], {
    spinning: loading
  }, _react["default"].createElement(Search, {
    placeholder: "\u641C\u7D22...",
    onSearch: handleSearch,
    style: {
      width: 200
    }
  }), _react["default"].createElement("br", null), _react["default"].createElement("br", null), _react["default"].createElement(_table["default"], {
    columns: columns,
    dataSource: data,
    size: "small",
    rowKey: "id",
    pagination: pagination ? {
      size: 'small'
    } : false,
    bordered: false,
    rowSelection: {
      type: type,
      selectedRowKeys: selectedRowKeys,
      onChange: handleChange,
      getCheckboxProps: requireValid ? handleDisabled : undefined
    }
  }));
}