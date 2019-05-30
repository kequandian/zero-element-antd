import React from 'react';
import { Icon } from 'antd';

export default (item, i, { index, record, records }) => {
  return <span key={i} className="ZEle-table-action-Sort">
    {index === 0 ? null : (<Icon type="arrow-up" title="上移" />)}
    {index === (records.length - 1) ? null : (<Icon type="arrow-down" title="下移" />)}
  </span>
}