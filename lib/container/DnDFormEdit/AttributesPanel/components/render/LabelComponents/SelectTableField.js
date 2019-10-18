"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SelectTableField;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireWildcard(require("react"));

var _request = require("zero-element/lib/utils/request");

var _window = _interopRequireDefault(require("zero-element/lib/utils/window"));

var _qs = _interopRequireDefault(require("qs"));

var Option = _select["default"].Option;

function getSearch(location) {
  if (location.search) {
    return location.search.replace('?', '');
  } else {
    return location.hash.split('?')[1] || '';
  }
}

function SelectTableField(props) {
  var field = props.field,
      label = props.label,
      value = props.value,
      handle = props.handle,
      config = props.config,
      options = props.options;
  var sql = config.sql,
      tableName = config.tableName;
  var table = options.table;
  var onAdvancedChange = handle.onAdvancedChange,
      onSave = handle.onSave;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      data = _useState4[0],
      setData = _useState4[1];

  var prevSqlValue = (0, _react.useRef)(sql.value);
  var tableFields = (0, _react.useRef)([]);
  (0, _react.useEffect)(function (_) {
    setData([]);

    if (prevSqlValue.current !== sql.value) {
      prevSqlValue.current = sql.value;
      clearValue();
    }

    if (sql.value && tableName.value) {
      queryTableData(sql.value, tableName.value);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [sql.value, tableName.value]);

  function clearValue() {
    onAdvancedChange(field, '');
  }

  function queryTableData(sql, tableName) {
    setLoading(true);
    var _window$location = _window["default"].location,
        location = _window$location === void 0 ? {} : _window$location;

    var qsObj = _qs["default"].parse(getSearch(location));

    var fAPI = "/api/generate/sql/".concat(qsObj.uuid, "/").concat(sql, "/table/").concat(tableName);
    (0, _request.query)(fAPI).then(function (response) {
      var status = response.status,
          data = response.data;

      if (status === 200 && data.code === 200) {
        setData(data.data.map(function (field) {
          return {
            id: field.field,
            title: field.comment || field.field,
            value: field.field
          };
        }));
      }
    })["finally"](function (_) {
      setLoading(false);
    });
  }

  function handleChange(value) {
    if (value) {
      var find = data.find(function (item) {
        return item.value === value;
      });
      tableFields.current = find.children;
      handleSetDefaultTableFields();
    }

    onAdvancedChange(field, value);
  }

  function handleSetDefaultTableFields() {
    if (table.length === 0) {
      table.push.apply(table, (0, _toConsumableArray2["default"])(tableFields.current.map(function (field) {
        return {
          label: field.comment || field.field,
          value: field.field
        };
      })));
      onSave();
    }
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", null, label), _react["default"].createElement(_select["default"], {
    style: {
      width: 190
    },
    value: value,
    onChange: handleChange,
    loading: loading,
    allowClear: true
  }, data.map(function (item) {
    return _react["default"].createElement(Option, {
      key: item.id,
      value: item.value
    }, item.title);
  })));
}