import React from 'react';

export default ({ props, defaultValue }) => {
  return <div {...props}>{defaultValue}</div>;
}