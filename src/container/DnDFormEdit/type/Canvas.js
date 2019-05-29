import React from 'react';
import Container from '../wrapped/LayoutContainer';
import '../index.css';

export default (props) => {
  const { children, parentId, options } = props;
  return <div>
    {children}
    <Container />
  </div>
}