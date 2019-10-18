"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/card/style/css");

var _card = _interopRequireDefault(require("antd/lib/card"));

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _react = _interopRequireDefault(require("react"));

var _Options = _interopRequireDefault(require("./Options"));

require("./index.css");

var _default = function _default(_ref) {
  var label = _ref.label,
      value = _ref.value,
      index = _ref.index,
      options = _ref.options,
      disabled = _ref.disabled,
      editId = _ref.editId,
      onClick = _ref.onClick,
      onChange = _ref.onChange,
      onRemove = _ref.onRemove,
      onOptionsChange = _ref.onOptionsChange;
  var edit = editId === index;

  function handleClick() {
    onClick(index);
  }

  return _react["default"].createElement(_card["default"], {
    size: "small",
    className: edit ? 'ZEleA-DnDFormEdit-ItemEdit-editing' : undefined,
    title: _react["default"].createElement("div", {
      className: "ZEleA-DnDFormEdit-ItemEdit-title",
      onClick: handleClick
    }, label),
    extra: _react["default"].createElement("div", null, _react["default"].createElement(_icon["default"], {
      type: "delete",
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-delete",
      onClick: onRemove.bind(null, index)
    }), _react["default"].createElement(_icon["default"], {
      type: edit ? 'up' : 'down',
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit",
      onClick: handleClick
    })),
    bodyStyle: {
      display: edit ? 'block' : 'none'
    }
  }, _react["default"].createElement("span", null, "\u6587\u672C: "), _react["default"].createElement(_input["default"], {
    value: label,
    onChange: onChange.bind(null, index, 'label')
  }), _react["default"].createElement("span", null, "\u503C: "), _react["default"].createElement(_input["default"], {
    value: value,
    onChange: onChange.bind(null, index, 'value')
  }), _react["default"].createElement(_Options["default"], {
    index: index,
    data: options,
    disabled: disabled,
    onChange: onOptionsChange
  }));
};

exports["default"] = _default;