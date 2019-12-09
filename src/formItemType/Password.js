import React from 'react';
import { Input } from 'antd';

const { Password } = Input;

export default ({ props, ...rest }) => {
  return <Password {...rest} {...props} />;
}