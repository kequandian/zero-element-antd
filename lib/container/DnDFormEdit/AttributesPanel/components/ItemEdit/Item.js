"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ItemEdit;

require("antd/lib/card/style/css");

var _card = _interopRequireDefault(require("antd/lib/card"));

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _react = _interopRequireDefault(require("react"));

var _Options = _interopRequireDefault(require("./Options"));

require("./index.css");

function ItemEdit(props) {
  var label = props.label,
      index = props.index,
      options = props.options,
      _props$valueField = props.valueField,
      valueField = _props$valueField === void 0 ? 'value' : _props$valueField,
      disabled = props.disabled,
      _props$text = props.text,
      _props$text$label = _props$text.label,
      tLabel = _props$text$label === void 0 ? '文本' : _props$text$label,
      _props$text$value = _props$text.value,
      tValue = _props$text$value === void 0 ? '值' : _props$text$value,
      editId = props.editId,
      onClick = props.onClick,
      onChange = props.onChange,
      onRemove = props.onRemove,
      onOptionsChange = props.onOptionsChange,
      onIndexChange = props.onIndexChange;
  var edit = editId === index;

  function handleClick() {
    onClick(index);
  }

  function handleMoveUp() {
    onIndexChange('up', index);
  }

  function handleMoveDown() {
    onIndexChange('down', index);
  }

  return /*#__PURE__*/_react["default"].createElement(_card["default"], {
    size: "small",
    className: edit ? 'ZEleA-DnDFormEdit-ItemEdit-editing' : undefined,
    title: /*#__PURE__*/_react["default"].createElement("div", {
      className: "ZEleA-DnDFormEdit-ItemEdit-title",
      onClick: handleClick
    }, label),
    extra: /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_icon["default"], {
      type: "arrow-up",
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit",
      onClick: handleMoveUp
    }), /*#__PURE__*/_react["default"].createElement(_icon["default"], {
      type: "arrow-down",
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit",
      onClick: handleMoveDown
    }), /*#__PURE__*/_react["default"].createElement(_icon["default"], {
      type: "delete",
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-delete",
      onClick: onRemove.bind(null, index)
    }), /*#__PURE__*/_react["default"].createElement(_icon["default"], {
      type: edit ? 'up' : 'down',
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit",
      onClick: handleClick
    })),
    bodyStyle: {
      display: edit ? 'block' : 'none'
    }
  }, /*#__PURE__*/_react["default"].createElement("span", null, tLabel, ": "), /*#__PURE__*/_react["default"].createElement(_input["default"], {
    value: label,
    onChange: onChange.bind(null, index, 'label')
  }), /*#__PURE__*/_react["default"].createElement("span", null, tValue, ": "), /*#__PURE__*/_react["default"].createElement(_input["default"], {
    value: props[valueField],
    onChange: onChange.bind(null, index, valueField)
  }), /*#__PURE__*/_react["default"].createElement(_Options["default"], {
    index: index,
    data: options,
    disabled: disabled,
    onChange: onOptionsChange
  }));
}