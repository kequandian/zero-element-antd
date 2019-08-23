"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _braftEditor = _interopRequireDefault(require("braft-editor"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

require("braft-editor/dist/index.css");

var _default = function _default(props) {
  var name = props.name,
      handle = props.handle,
      p = props.props,
      rest = (0, _objectWithoutProperties2["default"])(props, ["name", "handle", "props"]);
  (0, _lifeCycle.useDidMount)(function (_) {
    handle.onFormatValue(name, 'html');
  });
  return _react["default"].createElement(_braftEditor["default"], (0, _extends2["default"])({
    name: name
  }, rest, p, {
    placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
  }));
};

exports["default"] = _default;