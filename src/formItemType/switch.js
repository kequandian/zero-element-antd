/**
 * 开关组件，默认0为false，1为true
 */
import React from 'react';
import { Switch } from 'antd';

export default function SelectWrapped(props) {
  const { value, options = [], onChange, props: p, ...rest } = props;

  function handleChange(value) {
    onChange(value);
  }

  return <Switch
    onChange={handleChange}
    checked={value}
    {...rest}
    {...p}
  >
  </Switch>;
}