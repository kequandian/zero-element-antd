import React from 'react';
import { Table } from 'antd';

export default function STable({ config }) {
  const { options = {} } = config;
  const { base = {}, table = [] } = options;

  return <>
    <Table
      dataSource={[]}
      columns={table.map(item => {
        return {
          title: item.label,
          dataIndex: item.value,
          key: item.value,
        }
      })}
    />
  </>
}