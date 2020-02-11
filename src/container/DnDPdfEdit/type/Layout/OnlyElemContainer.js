import React from 'react';
import { Icon, Menu } from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import ElementContainer from '../../wrapped/ElementContainer';

import '../../index.css';

export default ({ layoutId, index, onPaste }) => {
  return <div>
    <ContextMenuTrigger id={`layout_${layoutId}_${index}`}>
      <div className="ZEleA-DnDFormEdit-Container">
        <ElementContainer layoutId={layoutId} index={index}>
          <span className="ZEleA-DnDFormEdit-empty">暂无Elem内容</span>
        </ElementContainer>
      </div>
    </ContextMenuTrigger>
    <ContextMenu
      id={`layout_${layoutId}_${index}`}
      className="ZEleA-DnDFormEdit-rightClickMenu"
    >
      <MenuItem>
        <Menu selectedKeys={[]}>
          <Menu.Item onClick={onPaste.bind(null, index)}>
            <Icon type="snippets" className="ZEleA-DnDFormEdit-primary" />粘贴元素
          </Menu.Item>
        </Menu>
      </MenuItem>
    </ContextMenu>
  </div>
}