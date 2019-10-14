"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = UploadFile;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/upload/style/css");

var _upload = _interopRequireDefault(require("antd/lib/upload"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _endpoint = require("zero-element/lib/utils/request/endpoint");

var _token = require("zero-element/lib/utils/request/token");

var _format = require("zero-element/lib/utils/format");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function UploadFile(props) {
  var value = props.value,
      options = props.options,
      namespace = props.namespace,
      handle = props.handle,
      rest = (0, _objectWithoutProperties2["default"])(props, ["value", "options", "namespace", "handle"]);
  var _options$API = options.API,
      API = _options$API === void 0 ? '/api/upload/files' : _options$API,
      _options$max = options.max,
      max = _options$max === void 0 ? 9 : _options$max;
  var onSaveOtherValue = handle.onSaveOtherValue;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      fileList = _useState2[0],
      setFileList = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      loading = _useState4[0],
      setLoading = _useState4[1];

  var fAPI = (0, _format.formatAPI)(API, {
    namespace: namespace
  });
  (0, _react.useEffect)(function (_) {
    setFileList(format(value));
  }, [value]);

  var uploadButton = _react["default"].createElement(_button["default"], null, _react["default"].createElement(_icon["default"], {
    type: loading ? 'loading' : 'plus'
  }), " \u70B9\u51FB\u4E0A\u4F20");

  function handleChange(info) {
    var fileList = info.fileList;
    setFileList(fileList);

    if (info.file.status === 'uploading' && fileList.length > 0) {
      setLoading(true);
    }

    if (info.file.status === 'done' || info.file.status === 'error' || info.file.status === 'removed') {
      setLoading(false);
      var doneImageList = fileList.filter(function (file) {
        return file.status === 'done';
      });
      var saveFileList = doneImageList.map(function (file) {
        return {
          name: file.response ? file.response.data.originalFileName : file.name,
          url: file.response ? file.response.data.url : file.url
        };
      });
      props.onChange(saveFileList);

      if (max === 1) {
        onSaveOtherValue('fileName', saveFileList[0].name);
      }
    }
  }

  var uploadProps = {
    name: 'file',
    action: /^http(s)*:\/\//.test(API) ? fAPI : "".concat((0, _endpoint.get)()).concat(fAPI),
    fileList: fileList,
    showUploadList: true,
    headers: {
      authorization: "Bearer ".concat((0, _token.getToken)())
    },
    onChange: handleChange
  };
  return _react["default"].createElement("div", (0, _extends2["default"])({
    className: "clearfix",
    style: {
      marginTop: '0.5em'
    }
  }, rest), _react["default"].createElement(_upload["default"], uploadProps, fileList.length >= max ? '' : uploadButton));
}

function format(value) {
  var rst = [];

  try {
    if (typeof value === 'string') {
      rst = JSON.parse(value);
    } else if (Array.isArray(value)) {
      rst = value;
    }
  } catch (e) {// rst.push(value);
  }

  rst.length > 0 && rst.map(function (item, index) {
    rst[index] = _objectSpread({}, item, {
      uid: index,
      status: 'done'
    });
  });
  return rst;
}