"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = queryWrapped;
exports.post = postWrapped;
exports.update = updateWrapped;
exports.remove = removeWrapped;

require("antd/lib/message/style/css");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _request = require("zero-element/lib/utils/request");

var _axios = require("zero-element/lib/utils/request/axios");

function requestWrapped(method, api, payload, _ref) {
  var _ref$message = _ref.message,
      optMsg = _ref$message === void 0 ? '操作成功' : _ref$message;
  var mh = {
    get: _request.query,
    post: _request.post,
    put: _request.update,
    remove: _request.remove
  };
  return mh[method](api, payload).then(function (response) {
    var status = response.status,
        data = response.data;

    if (status === 200 && data.code === 200) {
      if (method !== 'get' && optMsg) {
        _message2["default"].success(optMsg);
      }

      return Promise.resolve(data.data);
    }

    return Promise.reject(data.data);
  })["catch"](_axios.error);
}
/**
 *
 *
 * @param {string} api
 * @param {object} payload
 * @returns Promise
 */


function queryWrapped() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return requestWrapped.apply(void 0, ['get'].concat(args));
}

function postWrapped() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return requestWrapped.apply(void 0, ['post'].concat(args));
}

function updateWrapped() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return requestWrapped.apply(void 0, ['put'].concat(args));
}

function removeWrapped() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return requestWrapped.apply(void 0, ['remove'].concat(args));
}