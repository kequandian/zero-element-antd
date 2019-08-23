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

var _react = _interopRequireDefault(require("react"));

var _ItemEdit = _interopRequireDefault(require("./components/ItemEdit"));

var _render = require("./components/render");

require("../index.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function renderItemsOptions(items, handle, onRemove) {
  return items.map(function (item, i) {
    return _react["default"].createElement("div", {
      key: i
    }, _react["default"].createElement(_ItemEdit["default"], {
      label: item.label,
      value: item.value,
      index: i,
      onChange: handle,
      onRemove: onRemove
    }), _react["default"].createElement("br", null));
  });
}

var _default = function _default(_ref) {
  var current = _ref.current,
      dispatch = _ref.dispatch;
  var _current$options = current.options,
      options = _current$options === void 0 ? {} : _current$options;
  var _options$base = options.base,
      base = _options$base === void 0 ? {} : _options$base,
      style = options.style,
      items = options.items;

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

  function handleBaseChange(key, e) {
    base[key].value = e.target.value;
    onSave();
  }

  function handleStyleChange(key, e) {
    style[key].value = e.target.value;
    options.style = _objectSpread({}, style);
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

  return _react["default"].createElement(_drawer["default"], {
    visible: Boolean(current.id),
    mask: false,
    onClose: handleClose
  }, _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u57FA\u672C\u5C5E\u6027"), (0, _render.renderBaseOptions)(base, handleBaseChange), items ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u5B50\u9879"), _react["default"].createElement(_button["default"], {
    type: "dashed",
    icon: "plus",
    onClick: handleItemAdd
  }, "\u6DFB\u52A0\u5B50\u9879"), _react["default"].createElement("br", null), _react["default"].createElement("br", null), renderItemsOptions(items, handleItemsChange, handleItemDel)) : null, style ? _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u6837\u5F0F"), (0, _render.renderStyleOptions)(style, handleStyleChange)) : null);
};

exports["default"] = _default;