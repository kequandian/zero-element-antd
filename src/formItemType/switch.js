/**
 * 开关组件，默认0为false，1为true
 */
import React from 'react';
import { Switch } from 'antd';

export default function SelectWrapped(props) {
  const { value, options = [], onChange, props: p, ...rest } = props;

  function handleChange(value) {
    if(value===false){
      value=0
    }else{
      value=1
    }
    onChange(value);
  }

  return <Switch
    onChange={handleChange}
    checked={value===1?false:true}
    {...rest}
    {...p}
  >
  </Switch>;
}