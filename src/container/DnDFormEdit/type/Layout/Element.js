import React, { useContext } from 'react';
import classNames from 'classnames';
import { Icon, Menu } from 'antd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Render from '../../utils/Render';
import DnDContext from '../../utils/context';

import '../../index.css';

export default ({ index, data, onRemove, onEdit, onCopy }) => {
  const { current = {} } = useContext(DnDContext);
  const className = classNames({
    'ZEle-DnDFormEdit-row': true,
    'ZEle-DnDFormEdit-current': current.id === data.id,
  });
  return <div>
    <ContextMenuTrigger id={`element_${data.id}`}>
      <div className={className} onClick={onEdit.bind(null, index)}>
        <Render config={data} />
      </div>
    </ContextMenuTrigger>
    <ContextMenu
      id={`element_${data.id}`} className="ZEle-DnDFormEdit-rightClickMenu"
    >
      <MenuItem>
        <Menu selectedKeys={[]}>
          <Menu.Item onClick={onCopy.bind(null, index)} >
            <Icon type="copy" className="ZEle-DnDFormEdit-primary" />复制元素
          </Menu.Item>
          <Menu.Item onClick={onRemove.bind(null, index)} >
            <Icon type="delete" className="ZEle-DnDFormEdit-danger" />移除元素
          </Menu.Item>
        </Menu>
      </MenuItem>
    </ContextMenu>
  </div>
}