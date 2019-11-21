import React from 'react';

export default ({ config }) => {
  const { options = {} } = config;
  const { base = {} } = options;
  const { value = {} } = base;

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
      {value.value}
    </div>
  </div>;
}