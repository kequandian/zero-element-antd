"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _request = require("zero-element/lib/utils/request");

function _default(api, param) {
  (0, _request.upload)(api, {
    file: param.file
  }).then(function (response) {
    var data = response.data.data;

    if (data) {
      param.success({
        url: data.url
      });
    }
  })["catch"](function (error) {
    console.warn(error);
    param.error({
      msg: error
    });
  });
}