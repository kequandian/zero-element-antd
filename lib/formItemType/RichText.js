"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _braftEditor = _interopRequireDefault(require("braft-editor"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

require("braft-editor/dist/index.css");

var _default = function _default(props) {
  var name = props.name,
      value = props.value,
      handle = props.handle,
      onChange = props.onChange,
      p = props.props,
      rest = (0, _objectWithoutProperties2["default"])(props, ["name", "value", "handle", "onChange", "props"]);

  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      editorState = _useState2[0],
      setEditorState = _useState2[1];

  (0, _lifeCycle.useDidMount)(function (_) {
    handle.onFormatValue(name, 'html');
  });
  (0, _react.useEffect)(function (_) {
    setEditorState(_braftEditor["default"].createEditorState(value));
  }, [value]);

  function handleChange(editorState) {
    setEditorState(editorState);
    onChange(editorState);
  }

  return _react["default"].createElement(_braftEditor["default"], (0, _extends2["default"])({
    name: name
  }, rest, p, {
    value: editorState,
    onChange: handleChange,
    placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
  }));
};

exports["default"] = _default;