import React from 'react';
import { Checkbox } from 'antd';

export default ({ props, value, ...rest }) => {
  return <Checkbox.Group
    value={typeof value === 'string' ? [] : value}
    {...rest}
    {...props}
  />
}