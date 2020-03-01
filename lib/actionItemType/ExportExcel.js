"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ExportExcel;

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _request = require("zero-element/lib/utils/request");

var _Model = require("zero-element/lib/Model");

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
      API = options.API,
      method = options.method,
      fileName = options.fileName,
      rest = (0, _objectWithoutProperties2["default"])(options, ["icon", "API", "method", "fileName"]);

  var _useModel = (0, _Model.useModel)({
    namespace: namespace
  }),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 1),
      state = _useModel2[0];

  var searchData = state.searchData;

  function handleClick() {
    (0, _request.download)(API, {
      method: method,
      fileName: fileName
    }, searchData);
  }

  return _react["default"].createElement(_button["default"], {
    className: "ZEle-action-button",
    onClick: handleClick,
    icon: icon
  }, title);
}