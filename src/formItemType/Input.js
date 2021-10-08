import React from 'react';
import { Input } from 'antd';
import Toptips from './Toptips'
export default (({
  props,
  svg,
  placement,
  trigger,
  toptips,
  width="240px",
  ...rest
}) => {
  return toptips?<>
  <Input {...props} {...rest} style={{width:width}}></Input>
  <Toptips content={toptips} svg={svg} placement={placement} trigger={trigger}></Toptips>
  </>:<Input {...props} {...rest}  style={{width:width}}></Input>
});