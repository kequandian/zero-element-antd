"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = RichText;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _braftEditor = _interopRequireDefault(require("braft-editor"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _uploadFile = _interopRequireDefault(require("./uploadFile"));

require("braft-editor/dist/index.css");

function RichText(props) {
  var name = props.name,
      value = props.value,
      handle = props.handle,
      onChange = props.onChange,
      options = props.options,
      p = props.props,
      rest = (0, _objectWithoutProperties2["default"])(props, ["name", "value", "handle", "onChange", "options", "props"]);
  var _options$API = options.API,
      API = _options$API === void 0 ? '/api/fs/uploadfile' : _options$API;

  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      editorState = _useState2[0],
      setEditorState = _useState2[1];

  (0, _lifeCycle.useDidMount)(function (_) {
    handle.onFormatValue(name, 'html');
  });
  (0, _react.useEffect)(function (_) {
    if (value && typeof value === 'string') {
      setEditorState(_braftEditor["default"].createEditorState(value));
    }
  }, [value]);
  var media = {
    uploadFn: _uploadFile["default"].bind(null, API)
  };

  if (editorState) {
    return _react["default"].createElement(_braftEditor["default"], (0, _extends2["default"])({
      name: name
    }, rest, p, {
      defaultValue: editorState,
      media: media,
      onBlur: onChange,
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    }));
  }

  return _react["default"].createElement(_braftEditor["default"], (0, _extends2["default"])({
    name: name
  }, rest, p, {
    media: media,
    onBlur: onChange,
    placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
  }));
}