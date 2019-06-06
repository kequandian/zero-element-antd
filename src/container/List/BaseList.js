import React, { useEffect, useRef } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { formatTableFields } from './utils/format';
import { getActionItem } from '@/utils/readConfig';
import { Table } from 'antd';
import { Render } from 'zero-element-global/lib/layout';

export default function BaseList(props) {
  const symbolRef = useRef(Symbol('BaseList'));
  const { namespace, config } = props;
  const {
    layout = 'Empty',
    fields, operation, actions = [],
    props: propsCfg = {}, layoutConfig = {},
    actionLayout = 'Empty',
    actionLayoutConfig = {},
  } = config;
  const listProps = useBaseList({
    namespace,
    modelPath: 'listData',
    symbol: symbolRef.current,
  }, config);

  const { data, handle, modelStatus } = listProps;
  const { onGetList } = handle;
  const columns = formatTableFields(fields, operation, handle);

  useEffect(_ => {
    onGetList({});
  }, []);

  return <Render n={layout} {...layoutConfig}>
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actions.map((action, i) => getActionItem({
        key: i,
        namespace,
        ...action
      }, modelStatus))}
    </Render>
    <Table
      rowKey="id"
      dataSource={data}
      columns={columns}
      {...propsCfg}
    />
  </Render>
}