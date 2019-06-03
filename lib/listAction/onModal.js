"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onModal;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _zeroElement = _interopRequireDefault(require("zero-element"));

function onModal(props, context) {
  var options = props.options;
  var namespace = context.namespace,
      extra = context.extra;
  var modalTitle = options.modalTitle,
      rest = (0, _objectWithoutProperties2["default"])(options, ["modalTitle"]);

  function handleClose() {
    extra.modal = null;
  }

  extra.modal = _react["default"].createElement(_antd.Modal, {
    title: modalTitle,
    visible: true,
    onCancel: handleClose,
    bodyStyle: {
      padding: 0
    },
    footer: null
  }, _react["default"].createElement(_zeroElement["default"], {
    MODAL: true,
    namespace: namespace,
    config: rest,
    onClose: handleClose
  }));
}