import React, { useEffect } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { Table } from 'antd';

export default function BaseList(props) {
  const { namespace, config } = props;
  const { fields, props: propsCfg = {} } = config;
  const listProps = useBaseList({
    namespace,
    modelPath: 'listData',
  }, config);

  const { data, onGetList, onDelete } = listProps;
  useEffect(_ => {
    onGetList({});
  }, []);

  return <Table
    dataSource={data}
    {...propsCfg}
  />
}