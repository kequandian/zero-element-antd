import React from 'react';
import { Radio } from 'antd';

export default ({ props, ...rest }) => {
  return <Radio.Group {...rest} {...props} />
}