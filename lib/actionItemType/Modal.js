"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/modal/style/css");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _zeroElement = _interopRequireDefault(require("zero-element"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = function _default(props) {
  var title = props.title,
      options = props.options,
      namespace = props.namespace,
      handle = props.handle;
  var modalTitle = options.modalTitle,
      modalWidth = options.modalWidth,
      rest = (0, _objectWithoutProperties2["default"])(options, ["modalTitle", "modalWidth"]);

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

  return _react["default"].createElement("div", null, _react["default"].createElement(_button["default"], {
    onClick: handleOpen,
    type: "primary"
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
  }, _react["default"].createElement(_zeroElement["default"], {
    MODAL: true,
    namespace: namespace,
    config: _objectSpread({
      layout: 'Empty'
    }, rest),
    onClose: handleCloseAndQuery
  })));
};

exports["default"] = _default;