import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { formatTableFields } from '@/container/List/utils/format';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { query } from '@/utils/request';

export default function TableSelect(props) {
  const {
    name, className, value,
    options, namespace,
    onChange, handle,
    ...rest
  } = props;
  const { API, fields, type = 'checkbox' } = options;
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(_ => {
    if (Array.isArray(value)) {
      setSelectedRowKeys(value.map(item => item.id));
    }
  }, [value]);

  const columns = formatTableFields(fields, [], {}, {
    namespace,
  });

  useDidMount(_ => {
    if (API) {
      handleQueryData();
    }
  });

  function handleQueryData() {
    const fAPI = formatAPI(API, {
      namespace,
    });
    query(fAPI)
      .then(data => {
        let list = [];
        if (Array.isArray(data)) {
          list = data;
        } else if (Array.isArray(data.records)) {
          list = data.records;
        } else {
          console.warn(`api 返回的数据并非预期的列表结构 ${data}`);
        }
        setData(list);
      })
  }

  function handleChange(selectedRowKeys, selectedRows) {
    setSelectedRowKeys(selectedRowKeys);
    onChange(selectedRows);
  }

  return <div>
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      rowKey="id"
      pagination={false}
      bordered={false}
      rowSelection={{
        type: type,
        selectedRowKeys,
        onChange: handleChange,
      }}
    />
  </div>
}