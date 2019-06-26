import React from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatTableFields } from './utils/format';
import { getActionItem } from '@/utils/readConfig';
import { Table } from 'antd';
import { Render } from 'zero-element-global/lib/layout';

export default function BaseList(props) {
  const { namespace, config } = props;
  const {
    layout = 'Empty', layoutConfig = {},
    API = {},
    fields, operation, actions = [],
    props: propsCfg = {},
    actionLayout = 'Empty',
    actionLayoutConfig = {},
  } = config;
  const listProps = useBaseList({
    namespace,
    modelPath: 'listData',
  }, config);

  const { data, handle, modelStatus } = listProps;
  const { onGetList } = handle;

  const columns = formatTableFields(fields, operation, handle);

  useDidMount(_ => {
    if (API.listAPI) {
      onGetList({});
    }
  });

  return <Render n={layout} {...layoutConfig}>
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actions.map((action, i) => getActionItem({
        key: i,
        ...action,
      }, modelStatus, namespace, handle))}
    </Render>
    <Table
      rowKey="id"
      dataSource={props.data || data}
      columns={columns}
      {...propsCfg}
    />
  </Render>
}