import React from 'react';
import { Input } from 'antd';

export default ({ props, ...rest }) => {
  return <Input {...rest} {...props} />
}