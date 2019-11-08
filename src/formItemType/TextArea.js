import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default ({ props, ...rest }) => {
  return <TextArea
    autoSize={{
      minRows: 2,
    }}
    {...rest}
    {...props}
  />
}