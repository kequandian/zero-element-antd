import React from 'react';

export default ({ props, value, defaultValue }) => {
  return <div {...props}>{value || defaultValue}</div>;
}