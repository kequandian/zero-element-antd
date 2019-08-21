import React from 'react';
import { Select } from 'antd';

export default function SelectWrapped(props) {
  const { value, options = {}, onChange, props: p } = props;

  function hanldeChange(value) {
    onChange(value);
  }

  return <Select onChange={hanldeChange} value={value} {...p}>
    {options.map((option, i) =>
      <Select.Option value={option.value} key={i}>
        {option.label}
      </Select.Option>)}
  </Select>;
}