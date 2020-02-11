import React from 'react';
import { Input } from 'antd';

export default function InputWrapped({ label, field, value, onChange }) {
  return <>
    {label}
    <Input
      onChange={onChange.bind(null, field)}
      value={value}
    />
  </>
}