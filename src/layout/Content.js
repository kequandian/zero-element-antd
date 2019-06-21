import React from 'react';
import './index.css';

export default function Content(props) {
  const { title, children } = props;
  return <div className="ZEleA-Layout-Content">
    {title ? <h2>{title}</h2> : null}
    {children}
  </div>
}