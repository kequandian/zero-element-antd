import React from 'react';
import { Checkbox } from 'antd';

export default ({ props, defaultValue, value, ...rest }) => {
  
  let checkedList = value || defaultValue;

  return <Checkbox.Group
    value={typeof checkedList === 'string' ? [] : checkedList}
    {...rest}
    {...props}
  />
}