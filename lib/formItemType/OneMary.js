"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = OneMary;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _format = require("../container/List/utils/format");

var _readConfig = require("../utils/readConfig");

var _layout = require("zero-element/lib/config/layout");

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _TableSelect = _interopRequireDefault(require("./TableSelect"));

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
      model = props.model,
      formdata = props.formdata;
  var API = options.API,
      _options$layout = options.layout,
      layout = _options$layout === void 0 ? 'Empty' : _options$layout,
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
      map = options.map,
      optValue = options.value,
      _options$pagination = options.pagination,
      pagination = _options$pagination === void 0 ? false : _options$pagination,
      _options$rowSelection = options.rowSelection,
      rowSelection = _options$rowSelection === void 0 ? false : _options$rowSelection,
      _options$type = options.type,
      type = _options$type === void 0 ? 'checkbox' : _options$type,
      effectField = options.effectField;
  var onFormatValue = handle.onFormatValue,
      onGetFormData = handle.onGetFormData;
  var removeChildAfter = hooks.removeChildAfter;
  var effectFieldValue = formdata[effectField];

  var _useReducer = (0, _react.useReducer)(function (x) {
    return x + 1;
  }, 0),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      count = _useReducer2[0],
      forcedUpdate = _useReducer2[1];

  var idRef = (0, _react.useRef)(1);
  var v = (0, _react.useMemo)(function (_) {
    if (JSONString && typeof value === 'string' && value.length) {
      return JSON.parse(value);
    }

    return value;
  }, [value]);
  (0, _lifeCycle.useWillMount)(function (_) {
    if (map) {
      onFormatValue(name, 'map', map);
    }

    if (JSONString) {
      onFormatValue(name, 'JSONString');
    }
  });
  (0, _react.useEffect)(function (_) {
    if (effectField) {
      forcedUpdate();
      handleChange();
    }
  }, [effectFieldValue]);

  function handleChange(selectedRows, selectedRowKeys) {
    onChange(selectedRows);
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
  })), /*#__PURE__*/_react["default"].createElement(_TableSelect["default"], {
    value: optValue,
    onChange: handleChange,
    namespace: namespace,
    extraData: formdata,
    forceInitList: count,
    data: API ? undefined : v,
    columns: columns,
    options: {
      API: API,
      fields: fields,
      type: type,
      pagination: pagination,
      rowSelection: rowSelection,
      searchFields: false,
      value: optValue,
      rowKey: function rowKey(row) {
        return String(row._id || row.id || row[optValue]);
      }
    }
  }));
}