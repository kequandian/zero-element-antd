"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TableField;

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _react = _interopRequireWildcard(require("react"));

var _ItemEdit = _interopRequireDefault(require("../../ItemEdit"));

var _tool = require("../../../../../../utils/tool");

function TableField(props) {
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
    saveData();
  }

  function onChange(index, type, e) {
    var v = e.target.value;
    value[index][type] = v;
    saveData();
  }

  function handleItemIndexChange(type, index) {
    (0, _tool.arrayItemMove)(value, type, index);
    saveData();
  }

  function onRemove(index) {
    value.splice(index, 1);
    saveData();
  }

  function saveData() {
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
    onRemove: onRemove,
    onIndexChange: handleItemIndexChange
  }));
}