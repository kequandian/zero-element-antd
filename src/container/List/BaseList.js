import React, { useEffect } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { formatTableFields } from './utils/format';
import { Table } from 'antd';

export default function BaseList(props) {
  const { namespace, config } = props;
  const { fields, operation, props: propsCfg = {} } = config;
  const listProps = useBaseList({
    namespace,
    modelPath: 'listData',
  }, config);

  const { data, handle } = listProps;
  const { onGetList } = handle;
  const columns = formatTableFields(fields, operation, handle);
  useEffect(_ => {
    onGetList({});
  }, []);

  return <Table
    rowKey="id"
    dataSource={data}
    columns={columns}
    {...propsCfg}
  />
}