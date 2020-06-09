import React from 'react';
import { Table } from 'antd';
import { Render } from 'zero-element/lib/config/layout';
import useListHandle from './utils/useListHandle';

export default function ReportList(props) {
  const { namespace, config, extraData } = props;
  const {
    layout = 'Empty', layoutConfig = {},
    props: propsCfg = {},
    actionLayout = 'Row',
    actionLayoutConfig = {},
  } = config;

  const [tableProps, tableData, handle, actionsItems] = useListHandle({
    namespace,
    extraData,
    config,

    props,
  });

  function handleRowClassName(record, index) {
    if (index % 2 === 1) {
      return 'ZEleA-table-odd';
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
      className="ZEleA-ReportList"
      dataSource={props.data || tableData}
      rowClassName={handleRowClassName}
      {...tableProps}
      {...propsCfg}
    />
  </Render>
}