import React from 'react';
import { Card, Input, Icon } from 'antd';
import Options from './Options';
import './index.css';

export default ({
  label, value, index, options,
  disabled, // 禁用 options 的编辑
  editId, onClick,
  onChange, onRemove, onOptionsChange
}) => {
  const edit = editId === index;

  function handleClick() {
    onClick(index);
  }

  return <Card
    size="small"
    className={edit ? 'ZEleA-DnDFormEdit-ItemEdit-editing' : undefined}
    title={<div className="ZEleA-DnDFormEdit-ItemEdit-title"
      onClick={handleClick}>
      {label}
    </div>}
    extra={<div>
      <Icon
        type="delete"
        className="ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-delete"
        onClick={onRemove.bind(null, index)}
      />
      <Icon
        type={edit ? 'up' : 'down'}
        className="ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit"
        onClick={handleClick}
      />
    </div>}
    bodyStyle={{
      display: edit ? 'block' : 'none',
    }}
  >
    <span>文本: </span>
    <Input value={label} onChange={onChange.bind(null, index, 'label')} />
    <span>值: </span>
    <Input value={value} onChange={onChange.bind(null, index, 'value')} />
    <Options
      index={index}
      data={options}
      disabled={disabled}
      onChange={onOptionsChange}
    />
  </Card>
}