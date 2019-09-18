import React from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;
/**
 * 渲染树状数据
 *
 * @param {array|object} item 数组或对象
 * @returns react node
 */
function read(item) {
  if (Array.isArray(item)) {
    return item.map(i => read(i));
  }
  if (item.children) {
    return <TreeNode key={item.id} id={item.id} title={item.title}>
      {read(item.children)}
    </TreeNode>;
  }
  return <TreeNode key={item.id} id={item.id} title={item.title} />;
}

export default read;