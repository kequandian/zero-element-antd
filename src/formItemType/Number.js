import React from 'react';
import { InputNumber } from 'antd';

export default ({ props, ...rest }) => {
  return <InputNumber {...rest} {...props} />;
}