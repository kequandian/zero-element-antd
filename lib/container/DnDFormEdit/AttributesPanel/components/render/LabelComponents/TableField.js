"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SelectTable;

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _react = _interopRequireWildcard(require("react"));

var _ItemEdit = _interopRequireDefault(require("../../ItemEdit"));

function SelectTable(props) {
  var field = props.field,
      label = props.label,
      value = props.value,
      handle = props.handle;
  var countId = (0, _react.useRef)(0);

  function handleAppend() {
    countId.current = countId.current + 1;
    value.push({
      label: '新字段',
      field: countId.current
    });
    handle(field, {
      target: {
        value: value
      }
    });
  }

  function onChange(index, type, e) {
    var v = e.target.value;
    value[index][type] = v;
    handle(field, {
      target: {
        value: value
      }
    });
  }

  function onRemove(index) {
    value.splice(index, 1);
    handle(field, {
      target: {
        value: value
      }
    });
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", null, label), _react["default"].createElement(_button["default"], {
    icon: "plus",
    onClick: handleAppend
  }, "\u6DFB\u52A0\u5B50\u9879"), _react["default"].createElement("br", null), _react["default"].createElement("br", null), _react["default"].createElement(_ItemEdit["default"], {
    items: value,
    valueField: "field",
    onChange: onChange,
    onRemove: onRemove
  }));
}