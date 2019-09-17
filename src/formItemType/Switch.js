import React from 'react';
import { Switch } from 'antd';

const checkedMap = {
  'true': true,
  'false': false,
};
export default function SwitchWrapped(props) {
  const { value, options = {}, onChange, props: p, ...rest } = props;

  function hanldeChange(value) {
    onChange(value);
  }

  return <Switch checked={checkedMap[value]}
    onChange={hanldeChange}
    {...options}
    {...rest}
    {...p}
  />;
}