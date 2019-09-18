"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

/**
 * 根据 id 找到节点
 *
 * @param {string} id
 * @param {object} treeData
 * @returns object node
 */
function findNode(id, treeData) {
  var stack = [];

  if (Array.isArray(treeData)) {
    stack.push.apply(stack, (0, _toConsumableArray2["default"])(treeData));
  } else {
    stack.push(treeData);
  }

  var rst;

  while (stack.length) {
    var item = stack.shift();

    if (String(item.id) === id) {
      rst = item;
      break;
    }

    if (Array.isArray(item.children)) {
      stack.push.apply(stack, (0, _toConsumableArray2["default"])(item.children));
    }
  }

  return rst;
}

var _default = findNode;
exports["default"] = _default;