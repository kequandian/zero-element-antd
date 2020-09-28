import React from 'react';
import { Button } from 'antd';

export default (item, i, { index, record }, onAction) => {
  const { options } = item;
  const { button } = options;

  if (button) {
    return <Button key={i}
      {...button}
      onClick={onAction.bind(null, item.type, item.options)}
    >
      {item.title}
    </Button>
  }

  return (
    <span key={i}
      className="ZEleA-table-action-Outside-normal"
      onClick={onAction.bind(null, item.type, item.options)}
    >
      {item.title}
    </span>
  )
}