import React from 'react';
import { Icon, Menu } from 'antd';

export default (item, i, { index, record }, onAction) => {
  const iconMap = {
    'delete': 'delete',
    'modal': 'snippets',
    'path': 'link',
    'default': 'right',
  };
  const iconColorMap = {
    'delete': '#f5222d',
    'modal': '#1890ff',
    'path': '#1890ff',
    'default': '#666',
  };
  return (
    <Menu.Item key={i} className="ZEle-table-action-menuItem" onClick={onAction.bind(null, item.action, item.options)} >
      <span>
        <Icon
          type={item.options.icon || iconMap[item.action] || iconMap['default']}
          style={{ color: `${item.options.color || iconColorMap[item.action] || iconColorMap['default']}` }}
        />{item.title}
      </span>
    </Menu.Item>
  );
}