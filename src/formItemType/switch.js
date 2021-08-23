import React from 'react';
import { Switch } from 'antd';

export default function SelectWrapped(props) {
  const { value, options = [], onChange, props: p, ...rest } = props;

  function handleChange(value) {
    onChange(value);
  }

  return <Switch
    onChange={handleChange}
    value={value}
    {...rest}
    {...p}
  >
  </Switch>;
}