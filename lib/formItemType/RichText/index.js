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

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      canDo = _useState2[0],
      setCanDo = _useState2[1];

  var _useState3 = (0, _react.useState)(_braftEditor["default"].createEditorState(value)),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      braftEditor = _useState4[0],
      setBraftEditor = _useState4[1];

  (0, _lifeCycle.useDidMount)(function (_) {
    handle.onFormatValue(name, 'html'); // 若服务器返回了诸如 <p class="media-wrap image-wrap"></p> 这样的字符串
    // 会导致 createEditorState 生成了一个异常的 braftEditor, 并进而引发其它错误
    // 故重新 toHTML, 重新生成 braftEditor

    setBraftEditor(_braftEditor["default"].createEditorState(braftEditor.toHTML()));
    setCanDo(true);
  });
  var media = {
    uploadFn: _uploadFile["default"].bind(null, API)
  };

  if (canDo) {
    return _react["default"].createElement(_braftEditor["default"], (0, _extends2["default"])({
      name: name
    }, rest, p, {
      defaultValue: braftEditor,
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