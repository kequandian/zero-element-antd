import React from 'react';
import { toNumber } from '@/utils/tool';
import { InputNumber } from 'antd';

export default function valueTypeInputNumber(props) {
  const {
    field,
    handle,
    data: { index, text = '', record },
  } = props;
  const { onEdit } = handle;

  const v = toNumber(text);

  function handleChange(value) {
    record[field] = toNumber(value);
    onEdit(index, record);
  }

  return <InputNumber
    value={v}
    onChange={handleChange}
  />
}