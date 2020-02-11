"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Container = _interopRequireDefault(require("./Container"));

var _OnlyElemContainer = _interopRequireDefault(require("./OnlyElemContainer"));

var _Element = _interopRequireDefault(require("./Element"));

var _default = function _default(props) {
  var _props$itemCfg = props.itemCfg,
      itemCfg = _props$itemCfg === void 0 ? {} : _props$itemCfg,
      config = props.config,
      index = props.index,
      dispatch = props.dispatch;
  var items = config.items;

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

  function handlePaste() {
    dispatch({
      type: 'pasteElement',
      payload: {
        layoutId: config.id,
        index: index
      }
    });
  }

  return _react["default"].createElement(_react["default"].Fragment, null, itemCfg && itemCfg.id ? itemCfg.layout ? _react["default"].createElement(_OnlyElemContainer["default"], {
    layoutId: config.id,
    index: index,
    onPaste: handlePaste
  }) : _react["default"].createElement(_Element["default"], {
    index: index,
    data: itemCfg,
    onRemove: handleRemove,
    onEdit: handleActiveEdit,
    onCopy: handleCopyElement
  }) : _react["default"].createElement(_Container["default"], {
    layoutId: config.id,
    index: index,
    onPaste: handlePaste
  }));
};

exports["default"] = _default;