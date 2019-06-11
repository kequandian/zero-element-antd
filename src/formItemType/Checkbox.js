import React from 'react';
import { Checkbox } from 'antd';

export default ({ props, defaultValue, value, ...rest }) => {
  return <Checkbox.Group
    defaultValue={typeof defaultValue === 'string' ? [] : defaultValue}
    value={typeof value === 'string' ? [] : value}
    {...rest}
    {...props}
  />
}