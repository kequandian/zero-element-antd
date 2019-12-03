import React, { useState, useEffect } from 'react';
import { Spin, Input, Table } from 'antd';
import { formatTableFields } from '@/container/List/utils/format';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { query } from '@/utils/request';

const { Search } = Input;

export default function TableSelect(props) {
  const {
    name, className, value,
    options, namespace,
    onChange, handle,
    ...rest
  } = props;
  const {
    API, fields,
    type = 'checkbox',
    value: optValue = 'id',
    requireValid,
  } = options;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(_ => {
    if (Array.isArray(value)) {
      setSelectedRowKeys(value.map(item => item[optValue]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const columns = formatTableFields(fields, [], {}, {
    namespace,
  });

  useDidMount(_ => {
    if (API) {
      handleQueryData();
    }
  });

  function handleQueryData(queryData) {
    const fAPI = formatAPI(API, {
      namespace,
    });
    setLoading(true);
    query(fAPI, queryData)
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
      .finally(_ => {
        setLoading(false);
      })
  }

  function handleChange(selectedRowKeys, selectedRows) {
    setSelectedRowKeys(selectedRowKeys);
    onChange(selectedRows);
  }
  function handleDisabled(record) {
    const valid = record && record[optValue] !== 0 && Boolean(record[optValue]);
    return {
      disabled: !valid,
    }
  }
  function handleSearch(value) {
    handleQueryData({
      search: value,
    });
  }

  return <Spin spinning={loading}>
    <Search
      placeholder="搜索..."
      onSearch={handleSearch}
      style={{ width: 200 }}
    />
    <br /><br />
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
        getCheckboxProps: requireValid ? handleDisabled : undefined,
      }}
    />
  </Spin>
}