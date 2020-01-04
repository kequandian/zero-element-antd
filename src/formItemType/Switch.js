import React from 'react';
import { Switch } from 'antd';

const checkedMap = {
  'true': true,
  'false': false,
};
export default function SwitchWrapped(props) {
  const { value, options = {}, onChange, props: p, ...rest } = props;

  function handleChange(value) {
    onChange(value);
  }

  return <Switch checked={checkedMap[value]}
    onChange={handleChange}
    {...options}
    {...rest}
    {...p}
  />;
}