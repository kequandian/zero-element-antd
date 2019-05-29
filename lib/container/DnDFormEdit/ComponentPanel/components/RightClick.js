"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

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

  return _react["default"].createElement("div", null, _react["default"].createElement(_reactContextmenu.ContextMenuTrigger, {
    id: "right_".concat(data.id)
  }, children), _react["default"].createElement(_reactContextmenu.ContextMenu, {
    id: "right_".concat(data.id),
    className: "ZEle-DnDFormEdit-rightClickMenu"
  }, _react["default"].createElement(_reactContextmenu.MenuItem, null, _react["default"].createElement(_antd.Menu, null, _react["default"].createElement(_antd.Menu.Item, {
    onClick: handleRemove
  }, _react["default"].createElement(_antd.Icon, {
    type: "delete",
    className: "ZEle-DnDFormEdit-danger"
  }), "\u79FB\u9664")))));
};

exports["default"] = _default;