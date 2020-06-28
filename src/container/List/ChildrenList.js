import React from 'react';
import useBaseChildren from 'zero-element/lib/helper/form/useBaseChildren';
import { formatTableFields } from './utils/format';
import { getActionItem } from '@/utils/readConfig';
import { Table } from 'antd';
import { Render } from 'zero-element/lib/config/layout';

export default function ChildrenList(props) {
  const { namespace, config } = props;
  const {
    layout = 'Empty',
    fields, operation, actions = [],
    props: propsCfg = {}, layoutConfig = {},
    actionLayout = 'Row',
    actionLayoutConfig = {},
    itemsField = 'items',
  } = config;
  const childrenProps = useBaseChildren({
    namespace,
    modelPath: 'formData',
    itemsPath: itemsField,
  }, config);

  const { data, handle, model } = childrenProps;
  const { onCreate, onCreateList, onEdit } = handle;
  const { columns } = formatTableFields(fields, operation, handle);

  return <Render n={layout} {...layoutConfig}>
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actions.map((action, i) => getActionItem({
        key: i,
        ...action,
        onCreate,
        onCreateList,
        onEdit,
      }, model, {}, {
        namespace,
      }))}
    </Render>
    <Table
      rowKey={row => String(row._id || row.id)}
      dataSource={data}
      columns={columns}
      {...propsCfg}
    />
  </Render>
}