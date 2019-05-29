"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _Container = _interopRequireDefault(require("./Container"));

var _Element = _interopRequireDefault(require("./Element"));

var _EditModal = _interopRequireDefault(require("./EditModal"));

var _default = function _default(props) {
  var _props$itemCfg = props.itemCfg,
      itemCfg = _props$itemCfg === void 0 ? {} : _props$itemCfg,
      config = props.config,
      index = props.index,
      dispatch = props.dispatch;
  var value = config.value,
      items = config.items;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      visible = _useState2[0],
      setVisible = _useState2[1];

  function handleRemove(i, e) {
    e && e.stopPropagation && e.stopPropagation();
    dispatch({
      type: 'delElement',
      payload: {
        id: config.id,
        index: i
      }
    });
  }

  function handleActiveEdit(i) {
    dispatch({
      type: 'currentEdit',
      payload: items[i]
    });
  }

  function handleCopyElement(i, e) {
    e && e.stopPropagation && e.stopPropagation();
    dispatch({
      type: 'copyElement',
      payload: items[i]
    });
  }

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

  function handleRemoveRow() {
    dispatch({
      type: 'delRow',
      payload: config
    });
  }

  return _react["default"].createElement(_react["default"].Fragment, null, itemCfg.id ? _react["default"].createElement(_Element["default"], {
    index: index,
    data: itemCfg,
    onRemove: handleRemove,
    onEdit: handleActiveEdit,
    onCopy: handleCopyElement
  }) : _react["default"].createElement(_Container["default"], {
    layoutId: config.id,
    index: index,
    onEditRow: handleOpenModal,
    onRemoveRow: handleRemoveRow
  }), _react["default"].createElement(_EditModal["default"], {
    visible: visible,
    config: config,
    onCancel: handleCloseModal,
    onSave: handleChangeRowValue
  }));
};

exports["default"] = _default;