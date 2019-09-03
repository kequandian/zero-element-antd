import React from 'react';
import { Table, Typography } from 'antd';

const { Title, Text } = Typography;

export default function SRadio({ config }) {
  const { options = {} } = config;
  const { base = {}, advanced = {}, table = [] } = options;
  const { sql = {} } = advanced;

  return sql.value ? (
    <>
      <Title level={4}>一对多关系: <Text code>{sql.value}</Text></Title>
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
  )
    : <Title level={4}>一对多关系: [未关联]</Title>;
}