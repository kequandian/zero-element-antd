"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/menu/style/css");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _react = _interopRequireDefault(require("react"));

var _reactContextmenu = require("react-contextmenu");

require("../../index.css");

var _default = function _default(_ref) {
  var data = _ref.data,
      dispatch = _ref.dispatch,
      children = _ref.children;

  function handleRemove() {
    dispatch({
      type: 'delCopyElement',
      payload: data
    });
  }

  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_reactContextmenu.ContextMenuTrigger, {
    id: "right_".concat(data.id)
  }, children), /*#__PURE__*/_react["default"].createElement(_reactContextmenu.ContextMenu, {
    id: "right_".concat(data.id),
    className: "ZEleA-DnDFormEdit-rightClickMenu"
  }, /*#__PURE__*/_react["default"].createElement(_reactContextmenu.MenuItem, null, /*#__PURE__*/_react["default"].createElement(_menu["default"], null, /*#__PURE__*/_react["default"].createElement(_menu["default"].Item, {
    onClick: handleRemove
  }, /*#__PURE__*/_react["default"].createElement(_icon["default"], {
    type: "delete",
    className: "ZEleA-DnDFormEdit-danger"
  }), "\u79FB\u9664")))));
};

exports["default"] = _default;