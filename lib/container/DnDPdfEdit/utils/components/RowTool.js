"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = RowTool;

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _EditModal = _interopRequireDefault(require("./EditModal"));

require("../../index.css");

function handleRemoveRow(dispatch, config) {
  dispatch({
    type: 'delRow',
    payload: config
  });
}

function handleMoveUp(dispatch, config) {
  dispatch({
    type: 'rowMoveUp',
    payload: config
  });
}

function handleMoveDown(dispatch, config) {
  dispatch({
    type: 'rowMoveDown',
    payload: config
  });
}

function RowTool(_ref) {
  var dispatch = _ref.dispatch,
      config = _ref.config,
      component = _ref.component;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  function handleOpenModal() {
    setVisible(true);
  }

  function handleCloseModal() {
    setVisible(false);
  }

  function handleChangeRowValue(newValue) {
    dispatch({
      type: 'editRowValue',
      payload: {
        id: config.id,
        value: newValue
      }
    });
    handleCloseModal();
  }

  return _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-rowBox"
  }, _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-itemTool ZEleA-DnDFormEdit-itemTool-left"
  }, _react["default"].createElement(_icon["default"], {
    type: "delete",
    onClick: handleRemoveRow.bind(null, dispatch, config),
    className: "ZEleA-DnDFormEdit-danger"
  })), _react["default"].createElement("div", {
    className: "ZEleA-DnDFormEdit-itemTool ZEleA-DnDFormEdit-itemTool-right"
  }, _react["default"].createElement(_icon["default"], {
    type: "up",
    onClick: handleMoveUp.bind(null, dispatch, config),
    className: "ZEleA-DnDFormEdit-primary"
  }), _react["default"].createElement(_icon["default"], {
    type: "down",
    onClick: handleMoveDown.bind(null, dispatch, config),
    className: "ZEleA-DnDFormEdit-primary"
  }), _react["default"].createElement(_icon["default"], {
    type: "edit",
    onClick: handleOpenModal.bind(null, dispatch, config),
    className: "ZEleA-DnDFormEdit-primary"
  })), component, _react["default"].createElement(_EditModal["default"], {
    visible: visible,
    config: config,
    onCancel: handleCloseModal,
    onSave: handleChangeRowValue
  }));
}