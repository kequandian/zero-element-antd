import React from 'react';
import { Button } from 'antd';
import ElementItem from '../wrapped/ElementItem';

export default (props) => {
  const { title, type = 'Plain', ...rest } = props;
  return <ElementItem {...props} type={type}>
    <Button size="small">{title}</Button>
  </ElementItem>
}