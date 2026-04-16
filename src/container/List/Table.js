import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Render } from 'zero-element/lib/config/layout';
import useListHandle from './utils/useListHandle';
import tableFooter from './components/TableFooter';
import canPortal from '@/utils/canPortal';

export default function BaseTable(props) {
  const { namespace, config, extraData, extraEl } = props;
  const {
    layout = 'Empty', layoutConfig = {},
    props: propsCfg = {},
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
    if (record.id && operationData.id === record.id) {
      return 'ZEleA-table-selected';
    }
  }

  return <Render n={layout} {...layoutConfig}
    handle={handle}
    namespace={namespace}
  >
    {canPortal(extraEl, <>
      <Render n={'Row'}>
        {renderBatchOperation()}
        {actionsItems}
      </Render>
    </>)}
    <ProTable
      rowKey="id"
      size="middle"
      rowClassName={handleRowClassName}
      dataSource={props.data || tableData}
      showSorterTooltip={false}
      {...tableProps}
      {...propsCfg}
      footer={
        props.footer !== undefined ?
          props.footer :
          tableFooter(
            props.data || tableData,
            tableProps.columns)
      }
      search={false}
      options={false}
      pagination={tableProps.pagination}
    />
  </Render>
}