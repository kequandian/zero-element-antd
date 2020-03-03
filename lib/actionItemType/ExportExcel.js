"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ExportExcel;

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _request = require("zero-element/lib/utils/request");

var _Model = require("zero-element/lib/Model");

var _endpoint = require("zero-element/lib/utils/request/endpoint");

require("./index.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ExportExcel(props) {
  var _props$title = props.title,
      title = _props$title === void 0 ? '导出' : _props$title,
      options = props.options,
      namespace = props.namespace,
      handle = props.handle,
      listConfig = props.listConfig,
      restProps = (0, _objectWithoutProperties2["default"])(props, ["title", "options", "namespace", "handle", "listConfig"]);
  var _options$icon = options.icon,
      icon = _options$icon === void 0 ? 'download' : _options$icon,
      API = options.API,
      method = options.method,
      _options$name = options.name,
      name = _options$name === void 0 ? namespace : _options$name,
      fileName = options.fileName,
      rest = (0, _objectWithoutProperties2["default"])(options, ["icon", "API", "method", "name", "fileName"]);
  var _listConfig$API = listConfig.API,
      lAPI = _listConfig$API === void 0 ? {} : _listConfig$API;
  var listAPI = lAPI.listAPI;

  var _useModel = (0, _Model.useModel)({
    namespace: namespace
  }),
      _useModel2 = (0, _slicedToArray2["default"])(_useModel, 1),
      state = _useModel2[0];

  var searchData = state.searchData,
      listData = state.listData;

  function handleClick() {
    (0, _request.download)(API, {
      method: method,
      fileName: fileName
    }, _objectSpread({}, searchData, {
      templateName: name,
      api: "".concat((0, _endpoint.get)()).concat(listAPI, "?pageNum=").concat(listData.current, "&pageSize=").concat(listData.total)
    }));
  }

  return _react["default"].createElement(_button["default"], {
    className: "ZEle-action-button",
    onClick: handleClick,
    icon: icon
  }, title);
}