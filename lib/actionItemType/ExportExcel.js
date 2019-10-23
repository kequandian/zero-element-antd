"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ExportExcel;

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

require("./index.css");

function ExportExcel(props) {
  var _props$title = props.title,
      title = _props$title === void 0 ? '导出' : _props$title,
      options = props.options,
      namespace = props.namespace,
      handle = props.handle,
      restProps = (0, _objectWithoutProperties2["default"])(props, ["title", "options", "namespace", "handle"]);
  var _options$icon = options.icon,
      icon = _options$icon === void 0 ? 'download' : _options$icon,
      url = options.url,
      rest = (0, _objectWithoutProperties2["default"])(options, ["icon", "url"]);

  if (!url) {
    console.warn('import-excel 缺少必要的 options : url');
  }

  function handleClick() {
    console.log(111, url);
  }

  return _react["default"].createElement(_button["default"], {
    className: "ZEle-action-button",
    onClick: handleClick,
    icon: icon
  }, title);
}