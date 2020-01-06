"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ExportExcel;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _axios = _interopRequireWildcard(require("zero-element/lib/utils/request/axios"));

var _endpoint = require("zero-element/lib/utils/request/endpoint");

var _token = require("zero-element/lib/utils/request/token");

require("./index.css");

var _Model = require("zero-element/lib/Model");

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
      rest = (0, _objectWithoutProperties2["default"])(options, ["icon", "API"]);

  var _useModel = (0, _Model.useModel)({
    namespace: namespace
  }),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 1),
      state = _useModel2[0];

  var searchData = state.searchData;

  function handleClick() {
    download(API, searchData);
  }

  return _react["default"].createElement(_button["default"], {
    className: "ZEle-action-button",
    onClick: handleClick,
    icon: icon
  }, title);
}

function canEndPoint(api) {
  return api.indexOf('http') === -1 ? (0, _endpoint.get)() : undefined;
}

function download(_x, _x2) {
  return _download.apply(this, arguments);
}

function _download() {
  _download = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(api, params) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", (0, _axios["default"])({
              url: api,
              method: 'get',
              baseURL: canEndPoint(api),
              responseType: 'blob',
              headers: {
                'Authorization': "Bearer " + (0, _token.getToken)()
              },
              params: params
            }).then(function (res) {
              return downloadFile(res);
            })["catch"](_axios.error));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _download.apply(this, arguments);
}

function downloadFile(res) {
  var defaultName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'file';

  if (res.data.type === "application/json") {
    return Promise.reject('api 未返回文件数据流');
  } else {
    var disposition = res.headers['content-disposition'] || '';
    var matchRst = disposition.match(/filename=(\S+)/i);
    var fileName = matchRst && matchRst[1] || defaultName;
    var blob = new Blob([res.data]);

    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName); //兼容ie10
    } else {
      var link = document.createElement("a");
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", false, false);
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(link.href);
    }
  }
}