import React from 'react';
import { Table } from 'antd';
import { getActionItem } from '@/utils/readConfig';
import { formatTableFields } from '@/container/List/utils/format';
import { Render } from 'zero-element/lib/config/layout';

const demoData = [
  { key: 1, id: 1, name: '测试数据 1', sex: 1, status: 'Open' },
  { key: 2, id: 2, name: '测试数据 2', sex: 0, status: 'Close' },
];

export default function STable({ config }) {
  const { options = {} } = config;
  const { tableItems = [], actions = [], config: cfg } = options;

  const namespace = 'test';
  const model = {};

  const actionsItems = actions.map((action, i) => getActionItem({
    key: i,
    ...action,
  }, model, {}, {
    namespace,
    extraData: {},
  }));
  const { columns, width } = formatTableFields(tableItems.map(i => ({ ...i, field: i.value })),
    {}, {}, {
    namespace,
    extraData: {},
    model,
  });

  return <>
    <Render n={'Row'}>
      {actionsItems}
    </Render>
    <Table
      dataSource={demoData}
      columns={columns}
    />
  </>
}