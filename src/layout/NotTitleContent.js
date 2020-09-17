import React from 'react';
import './index.css';

export default function Content(props) {
  const { style, children } = props;
  return <div style={style} className="ZEleA-Layout-Content">
    {children}
  </div>
}