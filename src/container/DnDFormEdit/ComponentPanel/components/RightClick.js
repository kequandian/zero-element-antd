import React from 'react';
import { Menu, Icon } from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import '../../index.css';

export default ({ data, dispatch, children }) => {
  function handleRemove() {
    dispatch({
      type: 'delCopyElement',
      payload: data,
    });
  }
  return <div>
    <ContextMenuTrigger id={`right_${data.id}`}>
      {children}
    </ContextMenuTrigger>

    <ContextMenu
      id={`right_${data.id}`}
      className="ZEleA-DnDFormEdit-rightClickMenu"
    >
      <MenuItem>
        <Menu>
          <Menu.Item onClick={handleRemove} >
            <Icon type="delete" className="ZEleA-DnDFormEdit-danger" />移除
          </Menu.Item>
        </Menu>
      </MenuItem>
    </ContextMenu>
  </div>
}