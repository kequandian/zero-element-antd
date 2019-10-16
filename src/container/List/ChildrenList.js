import React from 'react';
import useBaseChildren from 'zero-element/lib/helper/form/useBaseChildren';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatTableFields } from './utils/format';
import { getActionItem } from '@/utils/readConfig';
import { Table } from 'antd';
import { Render } from 'zero-element-global/lib/layout';

export default function ChildrenList(props) {
  const { namespace, config } = props;
  const {
    layout = 'Empty',
    fields, operation, actions = [],
    props: propsCfg = {}, layoutConfig = {},
    actionLayout = 'Empty',
    actionLayoutConfig = {},
    itemsField = 'items',
  } = config;
  const childrenProps = useBaseChildren({
    namespace,
    modelPath: 'formData',
    itemsPath: itemsField,
  }, config);

  const { data, handle, modelStatus } = childrenProps;
  const { onCreate, onCreateList, onEdit } = handle;
  const columns = formatTableFields(fields, operation, handle);

  return <Render n={layout} {...layoutConfig}>
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actions.map((action, i) => getActionItem({
        key: i,
        ...action,
        onCreate,
        onCreateList,
        onEdit,
      }, modelStatus, namespace))}
    </Render>
    <Table
      rowKey={row => String(row._id || row.id)}
      dataSource={data}
      columns={columns}
      {...propsCfg}
    />
  </Render>
}