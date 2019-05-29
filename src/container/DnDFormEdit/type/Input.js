import React from 'react';
import { Input } from 'antd';

export default ({ config }) => {
  const { options = {} } = config;
  const { value = {} } = options.base || {};
  return <Input value={value.value} />;
}