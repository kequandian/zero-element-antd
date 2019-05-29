import React, { useState } from 'react';
import { Card, Input, Icon } from 'antd';
import './index.css';

export default ({ label, value, index, onChange, onRemove }) => {
  const [edit, setEdit] = useState(false);
  function switchEdit() {
    setEdit(!edit);
  }
  return <Card
    size="small"
    title={label}
    extra={<div>
      <Icon
        type="delete"
        className="ZEle-DnDFormEdit-ItemEdit-icon ZEle-DnDFormEdit-ItemEdit-icon-delete"
        onClick={onRemove.bind(null, index)}
      />
      <Icon
        type={edit ? 'up' : 'down'}
        className="ZEle-DnDFormEdit-ItemEdit-icon ZEle-DnDFormEdit-ItemEdit-icon-edit"
        onClick={switchEdit}
      />
    </div>}
    bodyStyle={{
      display: edit ? 'block' : 'none',
    }}
  >
    <span>文本: </span>
    <Input value={label} onChange={onChange.bind(null, index, 'label')} />
    <span>值: </span>
    <Input value={value} onChange={onChange.bind(null, index, 'label')} />
  </Card>
}