import React from 'react';
import { Table } from 'antd';
import { Render } from 'zero-element/lib/config/layout';
import useListHandle from './utils/useListHandle';
import TableFooter from './components/TableFooter';
import canPortal from '@/utils/canPortal';

export default function BaseTable(props) {
  const { namespace, config, extraData, extraEl } = props;
  const {
    layout = 'Empty', layoutConfig = {},
    props: propsCfg = {},
    actionLayout = 'Row',
    actionLayoutConfig = {},
  } = config;

  const [
    tableProps, tableData, handle, actionsItems,
    {
      operationData,
      renderBatchOperation,
    }
  ] = useListHandle({
    namespace,
    extraData,
    config,

    props,
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
    {canPortal(extraEl, <Render n={actionLayout} {...actionLayoutConfig}>
      {renderBatchOperation()}
      {actionsItems}
    </Render>)}
    <Table
      rowKey="id"
      size="middle"
      rowClassName={handleRowClassName}
      dataSource={props.data || tableData}
      {...tableProps}
      {...propsCfg}
      footer={() => {
        return <TableFooter
          dataSource={props.data || tableData}
          columns={tableProps.columns}
        />
      }}
    />
  </Render>
}