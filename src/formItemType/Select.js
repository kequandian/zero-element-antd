import React from 'react';
import { Select } from 'antd';

export default function SelectWrapped(props) {
  const { options = [] } = props;
  return <Select>
    {options.map((option, i) =>
      <Select.Option value={option.value} key={i}>
        {option.label}
      </Select.Option>)}
  </Select>;
}