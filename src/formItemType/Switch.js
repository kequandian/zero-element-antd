import React from 'react';
import { Switch } from 'antd';

const checkedMap = {
  'true': true,
  'false': false,
};
export default function SwitchWrapped(props) {
  const { value, options = {}, onChange } = props;

  function hanldeChange(value) {
    onChange(value);
  }

  return <Switch checked={checkedMap[value]}
    onChange={hanldeChange}
    {...options}
  />;
}