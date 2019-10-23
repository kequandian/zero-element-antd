import React from 'react';
import './index.css';

export default function Empty(props) {
  const { title, style, children } = props;
  return <div style={style}>
    {title ? <div className="ZEleA-Layout-EmptyTitle">{title}</div> : null}
    {children}
  </div>
}