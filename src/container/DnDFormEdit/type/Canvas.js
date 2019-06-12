import React from 'react';
import '../index.css';

export default (props) => {
  const { children, parentId, options } = props;
  return <div>
    {children}
  </div>
}