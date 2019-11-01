import React from 'react';

export default ({ config }) => {
  const { options = {} } = config;
  const { base = {} } = options;
  const { value = {} } = base;

  return <div>
    <div>提交的数据</div>
    <div>{value.value}</div>
  </div>;
}