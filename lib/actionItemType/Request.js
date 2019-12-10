"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Request;

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/message/style/css");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _request = require("zero-element/lib/utils/request");

require("./index.css");

var methodMap = {
  'get': _request.query,
  'post': _request.post,
  'put': _request.update,
  'delete': _request.remove,
  'download': _request.download
};

function Request(props) {
  var _props$title = props.title,
      title = _props$title === void 0 ? 'Request' : _props$title,
      options = props.options,
      namespace = props.namespace,
      handle = props.handle,
      restProps = (0, _objectWithoutProperties2["default"])(props, ["title", "options", "namespace", "handle"]);
  var _options$icon = options.icon,
      icon = _options$icon === void 0 ? 'monitor' : _options$icon,
      _options$method = options.method,
      method = _options$method === void 0 ? 'get' : _options$method,
      _options$message = options.message,
      message = _options$message === void 0 ? '操作成功' : _options$message,
      API = options.API,
      _options$data = options.data,
      data = _options$data === void 0 ? {} : _options$data,
      _options$buttonProps = options.buttonProps,
      buttonProps = _options$buttonProps === void 0 ? {} : _options$buttonProps,
      rest = (0, _objectWithoutProperties2["default"])(options, ["icon", "method", "message", "API", "data", "buttonProps"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  function handleClick() {
    var match = methodMap[method];

    if (!API) {
      console.warn('action-request 缺少必要的参数 : API');
      return;
    }

    setLoading(true);

    if (method === 'download') {
      return (0, _request.download)(API, {
        method: options.downloadMethod,
        fileName: options.fileName
      }).then(function (_) {
        setLoading(false);

        if (message) {
          _message2["default"].success(message);
        }
      });
    } else {
      match(API, data).then(function (_) {
        setLoading(false);

        if (message) {
          _message2["default"].success(message);
        }
      });
    }
  }

  return _react["default"].createElement(_button["default"], (0, _extends2["default"])({
    className: "ZEle-action-button",
    onClick: handleClick,
    icon: icon
  }, buttonProps, {
    loading: loading
  }), title);
}