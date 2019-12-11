"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NavMenu;

require("antd/lib/pagination/style/css");

var _pagination = _interopRequireDefault(require("antd/lib/pagination"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/menu/style/css");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

var _react = _interopRequireDefault(require("react"));

var _NavMenuItem = _interopRequireDefault(require("./NavMenuItem"));

var Item = _menu["default"].Item;

function NavMenu(_ref) {
  var selectId = _ref.selectId,
      data = _ref.data,
      onClick = _ref.onClick,
      onCreate = _ref.onCreate,
      onEdit = _ref.onEdit,
      onRemote = _ref.onRemote,
      pagination = _ref.pagination,
      onPagination = _ref.onPagination;
  if (!data.length) return null;

  function handleClick(_ref2) {
    var key = _ref2.key;
    var find = data.find(function (i) {
      return String(i.id) === key;
    });
    onClick(find);
  }

  function handleCreate() {
    onCreate();
  }

  return _react["default"].createElement(_react["default"].Fragment, null, onCreate ? _react["default"].createElement(_button["default"], {
    icon: "plus",
    type: "dashed",
    block: true,
    onClick: handleCreate
  }, "\u65B0\u589E") : null, _react["default"].createElement(_menu["default"], {
    mode: "inline",
    onClick: handleClick,
    selectedKeys: [selectId],
    style: {
      width: 186
    }
  }, data.map(function (item) {
    return _react["default"].createElement(Item, {
      key: item.id
    }, _react["default"].createElement(_NavMenuItem["default"], {
      data: item,
      onEdit: onEdit,
      onRemote: onRemote
    }));
  })), pagination && onPagination ? _react["default"].createElement(_pagination["default"], (0, _extends2["default"])({
    simple: true
  }, pagination, {
    onChange: onPagination
  })) : null);
}