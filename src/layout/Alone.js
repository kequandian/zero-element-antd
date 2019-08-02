import React from 'react';
import './index.css';

export default function Alone(props) {
  const { style, children } = props;
  return <div style={style} className="ZEleA-Layout-Alone">
    {children}
  </div>
}