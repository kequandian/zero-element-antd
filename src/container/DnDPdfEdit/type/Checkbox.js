import React from 'react';
import { Checkbox } from 'antd';

export default function SCheckbox({ config }) {
  const { options = {} } = config;
  const { base = {}, style = {}, items = [] } = options;
  const { value = {} } = base;

  return <Checkbox.Group options={items} value={[value]} />
}