"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/drawer/style/css");

var _drawer = _interopRequireDefault(require("antd/lib/drawer"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireDefault(require("react"));

var _ItemEdit = _interopRequireDefault(require("./components/ItemEdit"));

var _render = require("./components/render");

require("../index.css");

var _RequiredCheckbox = _interopRequireDefault(require("./components/RequiredCheckbox"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Option = _select["default"].Option;

function renderItemsOptions(items, handle) {
  var otherProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _react["default"].createElement(_ItemEdit["default"], (0, _extends2["default"])({
    items: items
  }, handle, otherProps));
}

function renderFieldsSelect(list, value, handleChange) {
  return _react["default"].createElement(_select["default"], {
    style: {
      width: '100%'
    },
    value: value,
    onChange: handleChange
  }, list.map(function (item, i) {
    return _react["default"].createElement(Option, {
      key: i,
      value: item
    }, item);
  }));
}

var _default = function _default(_ref) {
  var current = _ref.current,
      dispatch = _ref.dispatch,
      fields = _ref.fields;
  var _current$options = current.options,
      options = _current$options === void 0 ? {} : _current$options;
  var _options$field = options.field,
      field = _options$field === void 0 ? {} : _options$field,
      _options$base = options.base,
      base = _options$base === void 0 ? {} : _options$base,
      _options$rules = options.rules,
      rules = _options$rules === void 0 ? {} : _options$rules,
      style = options.style,
      items = options.items,
      advanced = options.advanced,
      config = options.config,
      table = options.table;

  function onSave() {
    dispatch({
      type: 'save',
      payload: {
        current: _objectSpread({}, current)
      }
    });
    dispatch({
      type: 'editElement',
      payload: current
    });
  }

  function handleClose() {
    dispatch({
      type: 'save',
      payload: {
        current: {}
      }
    });
  }

  function handleFieldChange(value) {
    field.value = value;
    onSave();
  }

  function handleBaseChange(key, e) {
    base[key].value = e.target.value;
    onSave();
  }

  function handleStyleChange(key, e) {
    style[key].value = e.target.value;
    options.style = _objectSpread({}, style);
    onSave();
  }

  function handleAdvancedChange(key, value) {
    advanced[key].value = value;
    options.advanced = _objectSpread({}, advanced);
    onSave();
  }

  function handleItemsChange(i, type, e) {
    items[i][type] = e.target.value;
    onSave();
  }

  function handleItemAdd() {
    items.push({
      label: "\u9009\u9879".concat(items.length + 1),
      value: items.length + 1
    });
    onSave();
  }

  function handleItemDel(i) {
    items.splice(i, 1);
    onSave();
  }

  function handleTableAdd() {
    table.push({
      label: "\u5B57\u6BB5".concat(table.length + 1),
      value: "f_".concat(table.length + 1),
      options: {
        type: 'plain',
        echoAdd: true,
        echoEdit: true
      }
    });
    onSave();
  }

  function handleTableChange(i, type, e) {
    table[i][type] = e.target.value;
    onSave();
  }

  function handleTableOptionsChange(i, type, value) {
    table[i].options[type] = value;
    onSave();
  }

  function handleTableDel(i) {
    table.splice(i, 1);
    onSave();
  }

  function handleRulesChange(key, value) {
    rules[key].value = value;
    onSave();
  }
  /**
   * 实际上是修改了 config 的 options
   *
   * @param {string} key
   * @param {event} e
   */


  function handleConfigChange(key, e) {
    config[key].value = e.target.value;
    onSave();
  }

  return _react["default"].createElement(_drawer["default"], {
    visible: Boolean(current.id),
    mask: false,
    onClose: handleClose
  }, _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u57FA\u672C\u5C5E\u6027"), _react["default"].createElement(_RequiredCheckbox["default"], {
    data: rules,
    onChange: handleRulesChange
  }), _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u5B57\u6BB5\u503C"), renderFieldsSelect(fields, field.value, handleFieldChange), (0, _render.renderBaseOptions)(base, handleBaseChange), items ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u5B50\u9879"), _react["default"].createElement(_button["default"], {
    type: "dashed",
    icon: "plus",
    onClick: handleItemAdd
  }, "\u6DFB\u52A0\u5B50\u9879"), _react["default"].createElement("br", null), _react["default"].createElement("br", null), renderItemsOptions(items, {
    onChange: handleItemsChange,
    onRemove: handleItemDel
  })) : null, config ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u914D\u7F6E"), (0, _render.renderBaseOptions)(config, handleConfigChange)) : null, advanced ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u9AD8\u7EA7"), (0, _render.renderAdvancedOptions)(advanced, options, {
    onAdvancedChange: handleAdvancedChange,
    onSave: onSave
  }), _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u663E\u793A\u5B57\u6BB5"), _react["default"].createElement(_button["default"], {
    type: "dashed",
    icon: "plus",
    onClick: handleTableAdd
  }, "\u6DFB\u52A0\u5B57\u6BB5"), _react["default"].createElement("br", null), _react["default"].createElement("br", null), renderItemsOptions(table, {
    onChange: handleTableChange,
    onRemove: handleTableDel,
    onOptionsChange: handleTableOptionsChange
  }, {
    disabled: Boolean(base.path && base.path.value)
  })) : null, style ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u6837\u5F0F"), (0, _render.renderStyleOptions)(style, handleStyleChange)) : null);
};

exports["default"] = _default;