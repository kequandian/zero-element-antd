"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _antd = require("antd");

var _reactContextmenu = require("react-contextmenu");

var _Render = _interopRequireDefault(require("../../utils/Render"));

var _context = _interopRequireDefault(require("../../utils/context"));

require("../../index.css");

var _default = function _default(_ref) {
  var index = _ref.index,
      data = _ref.data,
      onRemove = _ref.onRemove,
      onEdit = _ref.onEdit,
      onCopy = _ref.onCopy;

  var _useContext = (0, _react.useContext)(_context["default"]),
      _useContext$current = _useContext.current,
      current = _useContext$current === void 0 ? {} : _useContext$current;

  var className = (0, _classnames["default"])({
    'ZEle-DnDFormEdit-row': true,
    'ZEle-DnDFormEdit-current': current.id === data.id
  });
  return _react["default"].createElement("div", null, _react["default"].createElement(_reactContextmenu.ContextMenuTrigger, {
    id: "element_".concat(data.id)
  }, _react["default"].createElement("div", {
    className: className,
    onClick: onEdit.bind(null, index)
  }, _react["default"].createElement(_Render["default"], {
    config: data
  }))), _react["default"].createElement(_reactContextmenu.ContextMenu, {
    id: "element_".concat(data.id),
    className: "ZEle-DnDFormEdit-rightClickMenu"
  }, _react["default"].createElement(_reactContextmenu.MenuItem, null, _react["default"].createElement(_antd.Menu, {
    selectedKeys: []
  }, _react["default"].createElement(_antd.Menu.Item, {
    onClick: onCopy.bind(null, index)
  }, _react["default"].createElement(_antd.Icon, {
    type: "copy",
    className: "ZEle-DnDFormEdit-primary"
  }), "\u590D\u5236\u5143\u7D20"), _react["default"].createElement(_antd.Menu.Item, {
    onClick: onRemove.bind(null, index)
  }, _react["default"].createElement(_antd.Icon, {
    type: "delete",
    className: "ZEle-DnDFormEdit-danger"
  }), "\u79FB\u9664\u5143\u7D20")))));
};

exports["default"] = _default;