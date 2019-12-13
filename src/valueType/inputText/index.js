import React from 'react';
import { toNumber } from '@/utils/tool';
import { Input } from 'antd';

export default function valueTypeInputText(props) {
  const {
    field,
    handle,
    data: { index, text = '', record },
  } = props;
  const { onEdit } = handle;

  const v = toNumber(text);

  function handleChange(value) {
    record[field] = value;
    onEdit(index, record);
  }

  return <Input
    value={v}
    onChange={handleChange}
  />
}