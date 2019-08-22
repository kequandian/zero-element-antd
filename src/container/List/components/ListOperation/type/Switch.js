import React from 'react';
import { Switch } from 'antd';

export default (item, i, { index, record }, onAction) => {
  const { field = 'enabled' } = item.options;
  const enabled = Boolean(record[field]);
  return (
    <span key={i} onClick={onAction.bind(null, item.action, item.options)}>
      <Switch size="small" checked={enabled} />
    </span>
  )
}