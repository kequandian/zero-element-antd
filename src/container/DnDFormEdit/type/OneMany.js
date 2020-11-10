import React from 'react';
import { Table, Typography } from 'antd';

const { Title, Text } = Typography;

export default function OneMany({ config }) {
  const { options = {} } = config;
  const { base = {}, advanced = {}, table = [] } = options;
  const { sql = {}, tableName, field } = advanced;

  return <>
    <Title level={4}>
      一对多关系:
      {sql.value ? <Text code>{sql.value}</Text> : '[未关联]'}
      {tableName.value ? <Text code>{tableName.value}</Text> : '[未关联]'}
      {field.value ? <Text code>{field.value}</Text> : '[未关联]'}
    </Title>
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