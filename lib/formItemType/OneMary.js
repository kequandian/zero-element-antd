"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = OneMary;

require("antd/lib/table/style/css");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _format = require("../container/List/utils/format");

var _readConfig = require("../utils/readConfig");

var _layout = require("zero-element/lib/config/layout");

var _request = require("../utils/request");

var _format2 = require("zero-element/lib/utils/format");

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function OneMary(props) {
  var name = props.name,
      namespace = props.namespace,
      value = props.value,
      _props$options = props.options,
      options = _props$options === void 0 ? {} : _props$options,
      handle = props.handle,
      onChange = props.onChange,
      _props$hooks = props.hooks,
      hooks = _props$hooks === void 0 ? {} : _props$hooks,
      model = props.model;
  var API = options.API,
      _options$layout = options.layout,
      layout = _options$layout === void 0 ? 'Empty' : _options$layout,
      _options$dataField = options.dataField,
      dataField = _options$dataField === void 0 ? 'records' : _options$dataField,
      fields = options.fields,
      operation = options.operation,
      _options$actions = options.actions,
      actions = _options$actions === void 0 ? [] : _options$actions,
      _options$props = options.props,
      propsCfg = _options$props === void 0 ? {} : _options$props,
      _options$layoutConfig = options.layoutConfig,
      layoutConfig = _options$layoutConfig === void 0 ? {} : _options$layoutConfig,
      _options$actionLayout = options.actionLayout,
      actionLayout = _options$actionLayout === void 0 ? 'Row' : _options$actionLayout,
      _options$actionLayout2 = options.actionLayoutConfig,
      actionLayoutConfig = _options$actionLayout2 === void 0 ? {} : _options$actionLayout2,
      JSONString = options.JSONString,
      map = options.map;
  var onFormatValue = handle.onFormatValue,
      onGetFormData = handle.onGetFormData;
  var removeChildAfter = hooks.removeChildAfter;
  var idRef = (0, _react.useRef)(1);
  var v = (0, _react.useMemo)(function (_) {
    if (JSONString && typeof value === 'string' && value.length) {
      return JSON.parse(value);
    }

    return value;
  }, [value]);
  (0, _lifeCycle.useWillMount)(function (_) {
    if (API) {
      queryData();
    }

    if (map) {
      onFormatValue(name, 'map', map);
    }

    if (JSONString) {
      onFormatValue(name, 'JSONString');
    }
  });

  function queryData() {
    var fAPI = (0, _format2.formatAPI)(API, {
      namespace: namespace
    });
    (0, _request.query)(fAPI).then(function (data) {
      var list = Array.isArray(data) ? data : data[dataField];

      if (Array.isArray(list)) {
        onChange(list);
      } else {
        console.warn("API ".concat(fAPI, " \u8FD4\u56DE\u7684 data \u9884\u671F\u5E94\u8BE5\u4E3A Array, \u5B9E\u9645: "), list);
      }
    });
  }

  function handleCreate(data) {
    var rst = Array.isArray(v) ? v : [];
    rst.push(_objectSpread({}, data, {
      '_id': idRef.current++
    }));
    onChange((0, _toConsumableArray2["default"])(rst));
  }

  function handleCreateList(data) {
    if (!Array.isArray(data)) return false;
    var rst = Array.isArray(v) ? v : [];
    rst.push.apply(rst, (0, _toConsumableArray2["default"])(data.map(function (item) {
      return _objectSpread({}, item, {
        '_id': idRef.current++
      });
    })));
    onChange((0, _toConsumableArray2["default"])(rst));
  }

  function handleEdit(index, data) {
    v[index] = data;
    onChange((0, _toConsumableArray2["default"])(v));
  }

  function handleRemove(_ref) {
    var record = _ref.record,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? {} : _ref$options;
    var temp = v.filter(function (item) {
      if (item._id !== undefined) {
        return item._id !== record._id;
      }

      return item.id !== record.id;
    });
    onChange((0, _toConsumableArray2["default"])(temp));

    if (typeof removeChildAfter === 'function') {
      removeChildAfter(record, props);
    }
  }

  var _formatTableFields = (0, _format.formatTableFields)(fields, operation, {
    onRemoveChild: handleRemove,
    onEdit: handleEdit
  }, {
    namespace: namespace,
    model: model
  }),
      columns = _formatTableFields.columns;

  return /*#__PURE__*/_react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: layout
  }, layoutConfig), /*#__PURE__*/_react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: actionLayout
  }, actionLayoutConfig), actions.map(function (action, i) {
    return (0, _readConfig.getActionItem)(_objectSpread({
      key: i
    }, action, {
      value: v,
      onCreate: handleCreate,
      onCreateList: handleCreateList,
      onEdit: handleEdit,
      onGetFormData: onGetFormData
    }), {}, {}, {
      namespace: namespace
    });
  })), /*#__PURE__*/_react["default"].createElement(_table["default"], (0, _extends2["default"])({
    rowKey: function rowKey(row) {
      return String(row._id || row.id);
    },
    dataSource: v || [],
    columns: columns,
    pagination: false
  }, propsCfg)));
}