import React from 'react';

export default ({ props, value, defaultValue, ...rest }) => {
  return <div style={{
    fontSize: 18,
    color: '#0189ff',
    display: 'flex',
  }}>
    <div
      style={{
        width: 4,
        height: 26,
        backgroundColor: '#0198ff',
        marginRight: 2,
      }}
    ></div>
    <div>
      {value || defaultValue}
    </div>
  </div>;
}