import React from 'react';
import { Icon, Menu } from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ElementContainer from '../../wrapped/ElementContainer';

import '../../index.css';

export default ({ layoutId, index, onEditRow, onRemoveRow }) => {
  return <div>
    <ContextMenuTrigger id={`layout_${layoutId}_${index}`}>
      <ElementContainer layoutId={layoutId} index={index}>
        <span className="ZEleA-DnDFormEdit-empty">暂无内容</span>
      </ElementContainer>
    </ContextMenuTrigger>
    <ContextMenu
      id={`layout_${layoutId}_${index}`}
      className="ZEleA-DnDFormEdit-rightClickMenu"
    >
      <MenuItem>
        <Menu selectedKeys={[]}>
          <Menu.Item onClick={onEditRow.bind(null, index)}>
            <Icon type="edit" className="ZEleA-DnDFormEdit-primary" />编辑布局
          </Menu.Item>
          <Menu.Item onClick={onRemoveRow.bind(null, index)}>
            <Icon type="delete" className="ZEleA-DnDFormEdit-danger" />移除整行
          </Menu.Item>
        </Menu>
      </MenuItem>
    </ContextMenu>
  </div>
}