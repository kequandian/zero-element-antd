"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ImportExcel;

require("antd/lib/modal/style/css");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _zeroElement = _interopRequireDefault(require("zero-element"));

require("./index.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ImportExcel(props) {
  var _props$title = props.title,
      title = _props$title === void 0 ? '导入' : _props$title,
      options = props.options,
      namespace = props.namespace,
      handle = props.handle,
      restProps = (0, _objectWithoutProperties2["default"])(props, ["title", "options", "namespace", "handle"]);
  var _options$icon = options.icon,
      icon = _options$icon === void 0 ? 'upload' : _options$icon,
      _options$modalTitle = options.modalTitle,
      modalTitle = _options$modalTitle === void 0 ? 'Excel 导入' : _options$modalTitle,
      modalWidth = options.modalWidth,
      url = options.url,
      rest = (0, _objectWithoutProperties2["default"])(options, ["icon", "modalTitle", "modalWidth", "url"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      visible = _useState2[0],
      setViseble = _useState2[1];

  function handleOpen() {
    setViseble(true);
  }

  function handleClose() {
    setViseble(false);
  }

  function handleCloseAndQuery() {
    setViseble(false);

    if (typeof handle.onRefresh === 'function') {
      handle.onRefresh();
    }
  }

  if (!url) {
    console.warn('import-excel 缺少必要的 options : url');
  }

  var config = {
    layout: 'Empty',
    items: [{
      layout: 'Empty',
      component: 'BaseForm',
      config: {
        API: {
          getAPI: url
        },
        fields: [{
          label: 'Excel 文件',
          field: 'file',
          type: 'upload-file',
          options: _objectSpread({
            fileNameField: 'source'
          }, rest)
        }]
      }
    }]
  };
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_button["default"], {
    className: "ZEle-action-button",
    onClick: handleOpen,
    icon: icon
  }, title), _react["default"].createElement(_modal["default"], {
    title: modalTitle,
    width: modalWidth,
    visible: visible,
    destroyOnClose: true,
    onCancel: handleClose,
    bodyStyle: {
      padding: 0
    },
    footer: null
  }, _react["default"].createElement(_zeroElement["default"], (0, _extends2["default"])({
    MODAL: true,
    namespace: namespace,
    config: config
  }, restProps, {
    onClose: handleCloseAndQuery
  }))));
}