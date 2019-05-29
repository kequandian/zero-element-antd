import React from 'react';
import { Button } from 'antd';
import LayoutItem from '../wrapped/LayoutItem';

export default (props) => {
  const { title, type = 'Grid', ...rest } = props;
  return <LayoutItem type={type} {...props}>
    <Button size="small">{title}</Button>
  </LayoutItem>
}