import React from 'react';
import { Table } from 'antd';
import { Render } from 'zero-element-global/lib/layout';
import useListHandle from './utils/useListHandle';

export default function BaseList(props) {
  const { namespace, config, extraData, forceInitList } = props;
  const {
    layout = 'Empty', layoutConfig = {},
    props: propsCfg = {},
    actionLayout = 'Empty',
    actionLayoutConfig = {},
    share,
  } = config;

  console.log(333, share);

  const [
    tableProps, tableData, handle, actionsItems,
    {
      operationData,
    }
  ] = useListHandle({
    namespace,
    extraData,
    config,

    forceInitList,
  });

  function handleRowClassName(record) {
    if (operationData.id === record.id) {
      return 'ZEleA-table-selected';
    }
  }

  return <Render n={layout} {...layoutConfig}
    handle={handle}
    namespace={namespace}
  >
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actionsItems}
    </Render>
    <Table
      rowKey="id"
      size="middle"
      rowClassName={handleRowClassName}
      dataSource={props.data || tableData}
      {...tableProps}
      {...propsCfg}
    />
  </Render>
}