import React from 'react';

export default ({ props, value, options = {}, defaultValue, ...rest }) => {
  const { map = {} } = options;
  const v = value || defaultValue;
  return <div {...rest}{...props}>
    {(map[v]) || (v)}
  </div>;
}