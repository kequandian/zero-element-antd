import React from 'react';
import { Button, Popconfirm } from 'antd';

export default (item, i, { index, record }, onAction, popconfirmProps) => {
  const { options } = item;
  const { button, tips } = options;

  if (button) {
    return <Popconfirm key={i} {...popconfirmProps} visible={i === popconfirmProps.operationIndex}>
      <Button
        {...button}
        onClick={onAction.bind(null, item.type, item.options, {
          index: i,
        })}
      >
        {item.title}
      </Button>
    </Popconfirm>
  }

  return (
    <Popconfirm key={i} {...popconfirmProps} visible={i === popconfirmProps.operationIndex}>
      <span
        className="ZEleA-table-action-Outside-normal"
        onClick={onAction.bind(null, item.type, item.options, {
          index: i,
        })}
      >
        {item.title}
      </span>
    </Popconfirm>
  )
}