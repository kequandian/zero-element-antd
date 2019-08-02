import React from 'react';
import './index.css';

export default function Empty(props) {
  const { style, children } = props;
  return <div style={style}>
    {children}
  </div>
}