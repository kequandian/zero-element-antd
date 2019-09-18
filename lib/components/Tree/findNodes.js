"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

/**
 * 找到含有相同标题的 node
 *
 * @param {string} value 需要找的标题的值
 * @param {object} treeDat 树状数据结构
 * @returns {array} 找到的数据列表 
 */
function findNodes(value, treeData) {
  var stack = [treeData];
  var rst = [];

  while (stack.length) {
    var item = stack.shift();
    var _item$title = item.title,
        title = _item$title === void 0 ? '' : _item$title,
        children = item.children;

    if (title.indexOf(value) > -1) {
      rst.push(item);
    }

    if (Array.isArray(children)) {
      stack.push.apply(stack, (0, _toConsumableArray2["default"])(children));
    }
  }

  return rst;
}

var _default = findNodes;
exports["default"] = _default;