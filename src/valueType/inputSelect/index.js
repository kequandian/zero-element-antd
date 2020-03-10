import React from 'react';
import { Select } from 'antd';

export default function valueTypeInputSelect(props) {
  const {
    field,
    handle,
    options,
    data: { index, text = '', record },
  } = props;
  const { onEdit } = handle;
  const { width = 120, options: opts = [] } = options;

  function handleChange(value) {
    record[field] = value;
    onEdit(index, record);
  }

  return <Select
    onChange={handleChange}
    value={text}
    style={{ minWidth: width }}
  >
    {opts.map((option, i) =>
      <Select.Option value={option.value} key={i}>
        {option.label}
      </Select.Option>)}
  </Select>;
}