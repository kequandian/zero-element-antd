import React from 'react';
import { Radio } from 'antd';

export default ({ props, onChange, ...rest }) => {
  function handleChange(e) {
    onChange(e.target.value);
  }

  return <Radio.Group
    {...rest}
    {...props}
    onChange={handleChange}
  />
}