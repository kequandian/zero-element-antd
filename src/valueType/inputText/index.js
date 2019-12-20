import React from 'react';
import { Input } from 'antd';

export default function valueTypeInputText(props) {
  const {
    field,
    handle,
    data: { index, text = '', record },
  } = props;
  const { onEdit } = handle;

  function handleChange(e) {
    const value = e.target.value;
    record[field] = value;
    onEdit(index, record);
  }

  return <Input
    value={text}
    onChange={handleChange}
  />
}