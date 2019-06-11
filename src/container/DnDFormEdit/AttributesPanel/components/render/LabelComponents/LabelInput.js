import React from 'react';
import { Input } from 'antd';

export default function LabelInput({ field, label, value, handle }) {
  return <>
    <div>{label}</div>
    <Input
      value={value}
      onChange={handle.bind(null, field)}
    />
  </>
}