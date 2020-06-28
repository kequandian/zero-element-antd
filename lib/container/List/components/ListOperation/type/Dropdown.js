"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/menu/style/css");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _default = function _default(item, i, _ref, onAction) {
  var index = _ref.index,
      record = _ref.record;
  var iconMap = {
    'delete': _icons.DeleteOutlined,
    'modal': _icons.SnippetsOutlined,
    'path': _icons.LinkOutlined,
    'default': _icons.RightOutlined
  };
  var iconColorMap = {
    'delete': '#f5222d',
    'modal': '#1890ff',
    'path': '#1890ff',
    'default': '#666'
  };
  var Icon = item.options.icon || iconMap[item.action] || iconMap['default'];
  return /*#__PURE__*/_react["default"].createElement(_menu["default"].Item, {
    key: i,
    className: "ZEleA-table-action-menuItem",
    onClick: onAction.bind(null, item.action, item.options)
  }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(Icon, {
    style: {
      color: "".concat(item.options.color || iconColorMap[item.action] || iconColorMap['default'])
    }
  }), item.title));
};

exports["default"] = _default;