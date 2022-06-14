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
  <Input  style={{width:width}} {...props} {...rest}></Input>
  <Toptips content={toptips} svg={svg} placement={placement} trigger={trigger}></Toptips>
  </>:<Input style={{width:width}} {...props} {...rest} ></Input>
});