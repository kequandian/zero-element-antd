import React from 'react';

export default (item, i, { index, record }, onAction) => {
  return (
    <span key={i} onClick={onAction.bind(null, item.action, item.options)} className="ZEleA-table-action-Outside-normal">
      {item.title}
    </span>
  )
}