import React from 'react';
import './index.css';

export default function Content(props) {
  const { title, style, children } = props;
  return <div style={style} className="ZEleA-Layout-Content">
    {title ? <h2>{title}</h2> : null}
    {children}
  </div>
}