"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/menu/style/css");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

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
    'ZEleA-DnDFormEdit-row': true,
    'ZEleA-DnDFormEdit-current': current.id === data.id
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_reactContextmenu.ContextMenuTrigger, {
    id: "element_".concat(data.id)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: className,
    onClick: onEdit.bind(null, index)
  }, /*#__PURE__*/_react["default"].createElement(_Render["default"], {
    config: data
  }))), /*#__PURE__*/_react["default"].createElement(_reactContextmenu.ContextMenu, {
    id: "element_".concat(data.id),
    className: "ZEleA-DnDFormEdit-rightClickMenu"
  }, /*#__PURE__*/_react["default"].createElement(_reactContextmenu.MenuItem, null, /*#__PURE__*/_react["default"].createElement(_menu["default"], {
    selectedKeys: []
  }, /*#__PURE__*/_react["default"].createElement(_menu["default"].Item, {
    onClick: onCopy.bind(null, index)
  }, /*#__PURE__*/_react["default"].createElement(_icon["default"], {
    type: "copy",
    className: "ZEleA-DnDFormEdit-primary"
  }), "\u590D\u5236\u5143\u7D20"), /*#__PURE__*/_react["default"].createElement(_menu["default"].Item, {
    onClick: onRemove.bind(null, index)
  }, /*#__PURE__*/_react["default"].createElement(_icon["default"], {
    type: "delete",
    className: "ZEleA-DnDFormEdit-danger"
  }), "\u79FB\u9664\u5143\u7D20")))));
};

exports["default"] = _default;