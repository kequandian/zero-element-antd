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

var _ElementContainer = _interopRequireDefault(require("../../wrapped/ElementContainer"));

require("../../index.css");

var _default = function _default(_ref) {
  var layoutId = _ref.layoutId,
      index = _ref.index,
      onPaste = _ref.onPaste;
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
  }, _react["default"].createElement(_reactContextmenu.MenuItem, null, _react["default"].createElement(_menu["default"], {
    selectedKeys: []
  }, _react["default"].createElement(_menu["default"].Item, {
    onClick: onPaste.bind(null, index)
  }, _react["default"].createElement(_icon["default"], {
    type: "snippets",
    className: "ZEleA-DnDFormEdit-primary"
  }), "\u7C98\u8D34\u5143\u7D20")))));
};

exports["default"] = _default;