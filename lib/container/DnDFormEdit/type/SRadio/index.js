"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Item = _interopRequireDefault(require("./Item"));

require("./index.css");

function MRadio(props) {
  var id = props.id,
      value = props.value,
      children = props.children;

  function handleChange(value) {
    if (props.onChange) {
      props.onChange(value);
    }
  }

  return _react["default"].createElement("div", {
    className: "ZEle-MRadio"
  }, _react["default"].Children.map(children, function (child) {
    return _react["default"].cloneElement(child, {
      name: id,
      onChange: handleChange,
      checkedValue: value
    });
  }));
}

MRadio.Item = _Item["default"];
var _default = MRadio;
exports["default"] = _default;