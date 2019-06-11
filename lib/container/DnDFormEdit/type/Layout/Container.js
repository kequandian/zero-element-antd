"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _reactContextmenu = require("react-contextmenu");

var _ElementContainer = _interopRequireDefault(require("../../wrapped/ElementContainer"));

require("../../index.css");

var _default = function _default(_ref) {
  var layoutId = _ref.layoutId,
      index = _ref.index,
      onEditRow = _ref.onEditRow,
      onRemoveRow = _ref.onRemoveRow;
  return _react["default"].createElement("div", null, _react["default"].createElement(_reactContextmenu.ContextMenuTrigger, {
    id: "layout_".concat(layoutId, "_").concat(index)
  }, _react["default"].createElement(_ElementContainer["default"], {
    layoutId: layoutId,
    index: index
  }, _react["default"].createElement("span", {
    className: "ZEleA-DnDFormEdit-empty"
  }, "\u6682\u65E0\u5185\u5BB9"))), _react["default"].createElement(_reactContextmenu.ContextMenu, {
    id: "layout_".concat(layoutId, "_").concat(index),
    className: "ZEleA-DnDFormEdit-rightClickMenu"
  }, _react["default"].createElement(_reactContextmenu.MenuItem, null, _react["default"].createElement(_antd.Menu, {
    selectedKeys: []
  }, _react["default"].createElement(_antd.Menu.Item, {
    onClick: onEditRow.bind(null, index)
  }, _react["default"].createElement(_antd.Icon, {
    type: "edit",
    className: "ZEleA-DnDFormEdit-primary"
  }), "\u7F16\u8F91\u5E03\u5C40"), _react["default"].createElement(_antd.Menu.Item, {
    onClick: onRemoveRow.bind(null, index)
  }, _react["default"].createElement(_antd.Icon, {
    type: "delete",
    className: "ZEleA-DnDFormEdit-danger"
  }), "\u79FB\u9664\u6574\u884C")))));
};

exports["default"] = _default;