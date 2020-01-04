import React from 'react';
import { Select } from 'antd';

export default function SelectWrapped(props) {
  const { value, options = [], onChange, props: p, ...rest } = props;

  function handleChange(value) {
    onChange(value);
  }

  return <Select
    onChange={handleChange}
    value={value}
    style={{ minWidth: 120 }}
    {...rest}
    {...p}
  >
    {options.map((option, i) =>
      <Select.Option value={option.value} key={i}>
        {option.label}
      </Select.Option>)}
  </Select>;
}