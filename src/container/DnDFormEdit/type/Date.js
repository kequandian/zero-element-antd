import React from 'react';
import { DatePicker } from 'antd';

export default ({ config }) => {
  const { options = {} } = config;
  const { value = {}, placeholder = {} } = options.base || {};
  return <DatePicker placeholder={placeholder.value} />;
}