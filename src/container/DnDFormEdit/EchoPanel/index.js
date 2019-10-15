import React from 'react';
import Render from '../utils/Render';
import '../index.css';

export default (props) => {
  const { layoutType, ...rest } = props;
  return <div className={`ZEleA-DnDFormEdit-EchoPanel ZEleA-Form-${layoutType}`}>
    <Render {...rest} />
  </div>
}