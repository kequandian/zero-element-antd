"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

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
  return _react["default"].createElement(_antd.Menu.Item, {
    key: i,
    className: "ZEle-table-action-menuItem",
    onClick: onAction.bind(null, item.action, item.options)
  }, _react["default"].createElement("span", null, _react["default"].createElement(_antd.Icon, {
    type: item.options.icon || iconMap[item.action] || iconMap['default'],
    style: {
      color: "".concat(item.options.color || iconColorMap[item.action] || iconColorMap['default'])
    }
  }), item.title));
};

exports["default"] = _default;