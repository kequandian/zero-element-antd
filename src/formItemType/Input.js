import React from 'react';
import { Input } from 'antd';
import Toptips from './Toptips'
export default (({
  props,
  content,
  svg,
  placement,
  trigger,
  toptips,
  ...rest
}) => {
  
  return toptips?<>
  <Input {...props} {...rest}></Input>
  <Toptips title={toptips} content={content} svg={svg} placement={placement} trigger={trigger}></Toptips>
  </>:<Input {...props} {...rest}></Input>
});