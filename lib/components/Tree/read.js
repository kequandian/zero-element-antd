"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/tree/style/css");

var _tree = _interopRequireDefault(require("antd/lib/tree"));

var _react = _interopRequireDefault(require("react"));

var TreeNode = _tree["default"].TreeNode;
/**
 * 渲染树状数据
 *
 * @param {array|object} item 数组或对象
 * @returns react node
 */

function read(item) {
  if (Array.isArray(item)) {
    return item.map(function (i) {
      return read(i);
    });
  }

  if (item.children) {
    return _react["default"].createElement(TreeNode, {
      key: item.id,
      id: item.id,
      title: item.title
    }, read(item.children));
  }

  return _react["default"].createElement(TreeNode, {
    key: item.id,
    id: item.id,
    title: item.title
  });
}

var _default = read;
exports["default"] = _default;