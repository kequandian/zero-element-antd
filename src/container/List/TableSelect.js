import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Render } from 'zero-element-global/lib/layout';
import useListHandle from './utils/useListHandle';

export default function TableSelect(props) {
  const {
    namespace, config,
    extraData, forceInitList,
    options, value, onChange,
  } = props;
  const {
    layout = 'Empty', layoutConfig = {},
    props: propsCfg = {},
    actionLayout = 'Empty',
    actionLayoutConfig = {},
  } = config;

  const {
    type = 'checkbox',
    value: optValue = 'id',
    requireValid,
    pagination = false,
  } = options;

  const [
    tableProps, tableData, handle, actionsItems,
    {
      operationData,
    }
  ] = useListHandle({
    namespace,
    extraData,
    config,

    forceInitList,
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(_ => {
    if (Array.isArray(value)) {
      setSelectedRowKeys(value.map(item => item[optValue]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function handleRowClassName(record) {
    if (operationData.id === record.id) {
      return 'ZEleA-table-selected';
    }
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

  return <Render n={layout} {...layoutConfig}
    handle={handle}
    namespace={namespace}
  >
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actionsItems}
    </Render>
    <Table
      rowKey="id"
      size="small"
      bordered={false}
      rowClassName={handleRowClassName}
      dataSource={props.data || tableData}
      {...tableProps}
      {...propsCfg}

      pagination={
        pagination ?
          {
            size: 'small',
          }
          : false
      }
      rowSelection={{
        type: type,
        selectedRowKeys,
        onChange: handleChange,
        getCheckboxProps: requireValid ? handleDisabled : undefined,
      }}
    />
  </Render>
}