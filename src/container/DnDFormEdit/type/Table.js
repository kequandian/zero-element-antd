import React from 'react';
import { Table } from 'antd';
import { formatTableFields } from '@/container/List/utils/format';

export default function STable({ config }) {
  const { options = {} } = config;
  const { tableItems = [], config: cfg } = options;

  const namespace = 'test';
  const model = {};
  const { columns, width } = formatTableFields(tableItems.map(i => ({ ...i, field: i.value })),
    {}, {}, {
    namespace,
    extraData: {},
    model,
  });

  return <>
    <Table
      dataSource={[]}
      columns={columns}
    />
  </>
}