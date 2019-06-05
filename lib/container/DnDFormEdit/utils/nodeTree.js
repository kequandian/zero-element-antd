"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findNode = findNode;
exports.findEmptyNode = findEmptyNode;

/**
 * 从树中找到 id 所在的节点
 *  
 * @param {number} id
 * @param {object} nodeTree
 * @returns
 */
function findNode(id, node) {
  var queue = [node];

  while (queue.length) {
    var curNode = queue.shift();

    if (curNode) {
      if (curNode.id === id) {
        return curNode;
      }

      if (curNode.items && curNode.items.length) {
        queue = queue.concat(curNode.items);
      }
    }
  }
}
/**
 * 找到第一个含有空 items 的节点
 *
 * @param {object} nodeTree
 * @returns node or empty object
 */


function findEmptyNode(node) {
  var queue = [node];

  while (queue.length) {
    var curNode = queue.shift();

    if (curNode) {
      if (curNode.items) {
        if (curNode.items.length === 0 || curNode.items.includes(null)) {
          return curNode;
        } else {
          queue = queue.concat(curNode.items);
        }
      }
    }
  }

  return {};
}