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
  'delete': _request.remove,
  'download': _request.download
};

function onRequest(props) {
  var options = props.options,
      record = props.record;
  var API = options.API,
      _options$method = options.method,
      method = _options$method === void 0 ? 'get' : _options$method,
      _options$message = options.message,
      message = _options$message === void 0 ? '操作成功' : _options$message,
      fileNameField = options.fileNameField,
      _options$data = options.data,
      data = _options$data === void 0 ? {} : _options$data;
  var match = methodMap[method];

  if (method === 'download') {
    return (0, _request.download)(API, {
      method: options.downloadMethod,
      fileName: record[fileNameField] || options.fileName
    }).then(function (_) {
      if (message) {
        _message2["default"].success(message);
      }
    }); // .catch(_ => msg.error(JSON.stringify(_)));
  }

  return match(API, data).then(function (_) {
    if (message) {
      _message2["default"].success(message);
    }
  }); // .catch(_ => msg.error(JSON.stringify(_)));
}