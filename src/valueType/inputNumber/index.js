import React from 'react';
import { toNumber } from '@/utils/tool';
import { InputNumber } from 'antd';
import { useWillMount } from 'zero-element/lib/utils/hooks/lifeCycle';

export default function ValueTypeInputNumber(props) {
  const {
    field,
    handle,
    options = {},
    data: { index, text = '', record },
  } = props;
  const { onEdit } = handle;
  const { defaultValue } = options;

  const v = toNumber(text);

  useWillMount(_ => {
    if (v === '' && defaultValue !== undefined) {
      handleChange(defaultValue);
    } else {
      handleChange(v);
    }
  });

  function handleChange(value) {
    record[field] = toNumber(value);
    onEdit(index, record);
  }

  return <InputNumber
    value={v}
    onChange={handleChange}
  />
}