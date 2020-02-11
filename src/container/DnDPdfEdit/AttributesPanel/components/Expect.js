import React from 'react';
import { Input } from 'antd';

export default function Expect({
  data,
  onChange
}) {
  const { expectedField = {}, expectedValue = {} } = data;

  function handleChange(field, e) {
    onChange(field, e.target.value);
  }

  return <>
    <div>预期字段: </div>
    <Input
      value={expectedField.value}
      onChange={handleChange.bind(null, 'expectedField')}
    />
    <div>预期值: </div>
    <Input
      value={expectedValue.value}
      onChange={handleChange.bind(null, 'expectedValue')}
    />
  </>;
}