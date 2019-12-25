"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = RichText;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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
  var esRef = (0, _react.useRef)(null);
  var defaultValue = (0, _react.useMemo)(function (_) {
    return _braftEditor["default"].createEditorState(value);
  });
  (0, _lifeCycle.useDidMount)(function (_) {
    handle.onFormatValue(name, 'html');
  });
  var media = {
    uploadFn: _uploadFile["default"].bind(null, API)
  };
  console.log(123, defaultValue.toHTML());
  return _react["default"].createElement(_braftEditor["default"], (0, _extends2["default"])({
    name: name
  }, rest, p, {
    defaultValue: defaultValue,
    media: media,
    ref: esRef,
    onBlur: onChange,
    placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
  }));
}