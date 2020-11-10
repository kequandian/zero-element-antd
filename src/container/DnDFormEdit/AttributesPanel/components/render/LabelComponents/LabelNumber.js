import React from 'react';
import { InputNumber } from 'antd';

export default function LabelNumber({ field, label, value, handle }) {
  return <>
    <div>{label}</div>
    <InputNumber
      value={value}
      onChange={handle.bind(null, field)}
    />
  </>
}