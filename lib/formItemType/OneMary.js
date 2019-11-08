"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ChildrenList;

require("antd/lib/table/style/css");

var _table = _interopRequireDefault(require("antd/lib/table"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _format = require("../container/List/utils/format");

var _readConfig = require("../utils/readConfig");

var _layout = require("zero-element-global/lib/layout");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ChildrenList(props) {
  var namespace = props.namespace,
      value = props.value,
      _props$options = props.options,
      options = _props$options === void 0 ? {} : _props$options,
      onChange = props.onChange;
  var _options$layout = options.layout,
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
      actionLayout = _options$actionLayout === void 0 ? 'Empty' : _options$actionLayout,
      _options$actionLayout2 = options.actionLayoutConfig,
      actionLayoutConfig = _options$actionLayout2 === void 0 ? {} : _options$actionLayout2;
  var idRef = (0, _react.useRef)(0);

  function handleCreate(data) {
    value.push(_objectSpread({}, data, {
      '_id': idRef.current++
    }));
    onChange((0, _toConsumableArray2["default"])(value));
  }

  function handleEdit(index, data) {
    value[index] = data;
    onChange((0, _toConsumableArray2["default"])(value));
  }

  function handleRemove(_ref) {
    var record = _ref.record,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? {} : _ref$options;
    var temp = value.filter(function (item) {
      if (item._id !== undefined) {
        return item._id !== record._id;
      }

      return item.id !== record.id;
    });
    onChange((0, _toConsumableArray2["default"])(temp));
  }

  var columns = (0, _format.formatTableFields)(fields, operation, {
    onRemoveChild: handleRemove
  });
  return _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: layout
  }, layoutConfig), _react["default"].createElement("br", null), _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: actionLayout
  }, actionLayoutConfig), actions.map(function (action, i) {
    return (0, _readConfig.getActionItem)(_objectSpread({
      key: i
    }, action, {
      onCreate: handleCreate,
      // onCreateList,
      onEdit: handleEdit
    }), {}, {}, {
      namespace: namespace
    });
  })), _react["default"].createElement(_table["default"], (0, _extends2["default"])({
    rowKey: function rowKey(row) {
      return String(row._id || row.id);
    },
    dataSource: value || [],
    columns: columns,
    pagination: false
  }, propsCfg)));
}