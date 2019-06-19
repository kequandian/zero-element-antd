"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/modal/style/css");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _zeroElement = _interopRequireDefault(require("zero-element"));

var _default = function _default(props) {
  var title = props.title,
      options = props.options,
      namespace = props.namespace,
      onCreate = props.onCreate;
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
    config: (0, _objectSpread2["default"])({
      layout: 'Empty'
    }, rest),
    onClose: handleClose,
    onSubmit: onCreate
  })));
};

exports["default"] = _default;