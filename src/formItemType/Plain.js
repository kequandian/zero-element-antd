import React from 'react';

export default ({ props, value, defaultValue, ...rest }) => {
  return <div {...rest}{...props}>{value || defaultValue}</div>;
}