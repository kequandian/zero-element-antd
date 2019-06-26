import React from 'react';
import useBaseChildren from 'zero-element/lib/helper/form/useBaseChildren';
import { formatTableFields } from './utils/format';
import { getActionItem } from '@/utils/readConfig';
import { Table } from 'antd';
import { Render } from 'zero-element-global/lib/layout';

export default function BaseChildren(props) {
  const { namespace, config } = props;
  const {
    layout = 'Empty',
    fields, operation, actions = [],
    props: propsCfg = {}, layoutConfig = {},
    actionLayout = 'Empty',
    actionLayoutConfig = {},
  } = config;
  const childrenProps = useBaseChildren({
    namespace,
    modelPath: 'formData',
  }, config);

  const { data, handle, modelStatus } = childrenProps;
  const { onCreate } = handle;
  const columns = formatTableFields(fields, operation, handle);

  return <Render n={layout} {...layoutConfig}>
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actions.map((action, i) => getActionItem({
        key: i,
        ...action,
        onCreate,
      }, modelStatus, namespace))}
    </Render>
    <Table
      rowKey={(row) => row._id || row.id}
      dataSource={data}
      columns={columns}
      {...propsCfg}
    />
  </Render>
}