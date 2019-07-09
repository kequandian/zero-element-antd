"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onRequest;

require("antd/lib/message/style/css");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _request = require("zero-element/lib/utils/request");

var methodMap = {
  'get': _request.query,
  'post': _request.post,
  'put': _request.update,
  'delete': _request.remove
};

function onRequest(_ref) {
  var options = _ref.options,
      record = _ref.record;
  var API = options.API,
      _options$method = options.method,
      method = _options$method === void 0 ? 'get' : _options$method,
      _options$message = options.message,
      message = _options$message === void 0 ? '操作失败' : _options$message;
  var match = methodMap[method];
  match(API)["catch"](function (_) {
    return _message2["default"].error(message);
  });
}