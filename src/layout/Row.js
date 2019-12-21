import React from 'react';
import './index.css';

export default function Row(props) {
  const { style, children } = props;
  return <div className="ZEleA-Layout-Row" style={style}>
    {children}
  </div>
}