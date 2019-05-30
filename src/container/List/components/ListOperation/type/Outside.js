import React from 'react';

export default (item, i, { index, record }, onAction) => {
  return (
    <span key={i} onClick={onAction.bind(null, item.action, item.options)} className="ZEle-table-action-Outside-normal">
      <a href="javascript:;">
        {item.title}
      </a>
    </span>
  )
}