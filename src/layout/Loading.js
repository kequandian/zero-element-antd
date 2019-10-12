import React from 'react';
import { Spin } from 'antd';

export default function Loading(props) {
  const { loading = true, children } = props;
  return <Spin spinning={loading}>
    {children}
  </Spin>
}