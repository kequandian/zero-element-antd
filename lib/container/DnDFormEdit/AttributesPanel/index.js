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

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireDefault(require("react"));

var _tool = require("../../../utils/tool");

var _ItemEdit = _interopRequireDefault(require("./components/ItemEdit"));

var _render = require("./components/render");

require("../index.css");

var _Checkbox = _interopRequireDefault(require("./components/Checkbox"));

var _Expect = _interopRequireDefault(require("./components/Expect"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Option = _select["default"].Option;

function renderItemsOptions(items, handle) {
  var otherProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return /*#__PURE__*/_react["default"].createElement(_ItemEdit["default"], (0, _extends2["default"])({
    items: items
  }, handle, otherProps));
}

function renderFieldsSelect(list, value, handleChange) {
  return /*#__PURE__*/_react["default"].createElement(_select["default"], {
    style: {
      width: '100%'
    },
    value: value,
    onChange: handleChange
  }, list.map(function (item, i) {
    return /*#__PURE__*/_react["default"].createElement(Option, {
      key: i,
      value: item
    }, item);
  }));
}

var _default = function _default(_ref) {
  var _renderItemsOptions;

  var current = _ref.current,
      dispatch = _ref.dispatch,
      fields = _ref.fields,
      API = _ref.API;
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
      table = options.table,
      expect = options.expect,
      pdf = options.pdf;
  var required = rules.required,
      restRules = (0, _objectWithoutProperties2["default"])(rules, ["required"]);

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
    base[key].value = (0, _tool.toNumber)(e.target.value);
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

  function handleItemChange(i, type, e) {
    items[i][type] = (0, _tool.toNumber)(e.target.value);
    onSave();
  }

  function handleItemAdd() {
    items.push({
      label: "\u9009\u9879".concat(items.length + 1),
      value: items.length + 1
    });
    onSave();
  }

  function handleItemIndexChange(type, index) {
    (0, _tool.arrayItemMove)(items, type, index);
    onSave();
  }

  function handleItemDel(i) {
    items.splice(i, 1);
    onSave();
  }

  function handleTableAdd(pdf) {
    table.push({
      label: "\u5B57\u6BB5".concat(table.length + 1),
      value: "f_".concat(table.length + 1),
      options: _objectSpread({
        type: 'plain'
      }, pdf ? {} : {
        echoAdd: true,
        echoEdit: true,
        echoType: true
      })
    });
    onSave();
  }

  function handleTableChange(i, type, e) {
    table[i][type] = e.target.value;
    onSave();
  }

  function handleTableIndexChange(type, index) {
    (0, _tool.arrayItemMove)(table, type, index);
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

  function handleRulesMsgChange(key, value) {
    rules[key].message = value;
    onSave();
  }

  function handleExpectChange(key, value) {
    if (!expect[key]) {
      expect[key] = {};
    }

    expect[key].value = (0, _tool.toNumber)(value);
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

  return /*#__PURE__*/_react["default"].createElement(_drawer["default"], {
    visible: Boolean(current.id),
    mask: false,
    onClose: handleClose
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u57FA\u672C\u5C5E\u6027"), /*#__PURE__*/_react["default"].createElement(_Checkbox["default"], {
    field: "required",
    data: required,
    onChange: handleRulesChange
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u5B57\u6BB5\u503C(\u540E\u7AEF\u5B57\u6BB5)"), renderFieldsSelect(fields, field.value, handleFieldChange), (0, _render.renderBaseOptions)(base, handleBaseChange), Object.keys(restRules).length ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u6570\u636E\u6821\u9A8C"), Object.keys(restRules).map(function (key) {
    return /*#__PURE__*/_react["default"].createElement(_Checkbox["default"], {
      key: key,
      field: key,
      data: restRules[key],
      onChange: handleRulesChange,
      onMsgChange: handleRulesMsgChange
    });
  })) : null, items ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u5B50\u9879"), /*#__PURE__*/_react["default"].createElement(_button["default"], {
    type: "dashed",
    icon: "plus",
    onClick: handleItemAdd
  }, "\u6DFB\u52A0\u5B50\u9879"), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), renderItemsOptions(items, {
    onChange: handleItemChange,
    onRemove: handleItemDel,
    onIndexChange: handleItemIndexChange
  })) : null, config ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u914D\u7F6E"), (0, _render.renderBaseOptions)(config, handleConfigChange)) : null, expect ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u9884\u671F"), /*#__PURE__*/_react["default"].createElement(_Expect["default"], {
    data: expect,
    onChange: handleExpectChange
  })) : null, advanced ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u9AD8\u7EA7"), (0, _render.renderAdvancedOptions)(advanced, options, {
    onAdvancedChange: handleAdvancedChange,
    onSave: onSave
  }, {
    API: API
  })) : null, table ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u663E\u793A\u5B57\u6BB5"), /*#__PURE__*/_react["default"].createElement(_button["default"], {
    type: "dashed",
    icon: "plus",
    onClick: handleTableAdd.bind(null, pdf)
  }, "\u6DFB\u52A0\u5B57\u6BB5"), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), renderItemsOptions(table, (_renderItemsOptions = {
    onChange: handleTableChange,
    onRemove: handleTableDel,
    onOptionsChange: handleTableOptionsChange
  }, (0, _defineProperty2["default"])(_renderItemsOptions, "onOptionsChange", handleTableOptionsChange), (0, _defineProperty2["default"])(_renderItemsOptions, "onIndexChange", handleTableIndexChange), _renderItemsOptions), {
    disabled: Boolean(base.path && base.path.value)
  })) : null, style ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u6837\u5F0F"), (0, _render.renderStyleOptions)(style, handleStyleChange)) : null);
};

exports["default"] = _default;