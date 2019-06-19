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

var _default = function _default(item, i, _ref, onAction) {
  var index = _ref.index,
      record = _ref.record;
  var iconMap = {
    'delete': 'delete',
    'modal': 'snippets',
    'path': 'link',
    'default': 'right'
  };
  var iconColorMap = {
    'delete': '#f5222d',
    'modal': '#1890ff',
    'path': '#1890ff',
    'default': '#666'
  };
  return _react["default"].createElement(_menu["default"].Item, {
    key: i,
    className: "ZEleA-table-action-menuItem",
    onClick: onAction.bind(null, item.action, item.options)
  }, _react["default"].createElement("span", null, _react["default"].createElement(_icon["default"], {
    type: item.options.icon || iconMap[item.action] || iconMap['default'],
    style: {
      color: "".concat(item.options.color || iconColorMap[item.action] || iconColorMap['default'])
    }
  }), item.title));
};

exports["default"] = _default;