import React from 'react';
import { Radio } from 'antd';

export default function LabelRadio({ field, label, value, handle, options }) {
  return <>
    <div>{label}</div>
    <Radio.Group
      value={value}
      onChange={handle.bind(null, field)}
    >
      {options.map(item => {
        return <Radio key={item.value} value={item.value}>{item.label}</Radio>;
      })}
    </Radio.Group>
  </>
}