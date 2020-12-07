import React, { useState, useEffect, useRef } from 'react';
import { Table } from 'antd';
import { Render } from 'zero-element/lib/config/layout';
import useListHandle from './utils/useListHandle';
import { getPageData, removeModel } from 'zero-element/lib/Model';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import _ from 'lodash';

export default function TableSelect(props) {
  const {
    namespace, config,
    extraData,
    options, value, onChange,
    onChangeTableData,
    mode,
  } = props;
  const {
    layout = 'Empty', layoutConfig = {},
    props: propsCfg = {},
    actionLayout = 'Row',
    actionLayoutConfig = {},
  } = config;

  const {
    type = 'checkbox',
    value: optValue = 'id',
    requireValid,
    pagination = false,
    rowSelection = Boolean(type),
    rowKey,
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

    props,
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const selectedRef = useRef({});
  const initSselectedRef = useRef({
    selectedRowKeys: [],
    selectedRows: [],
  });
  const initRef = useRef(false);

  useEffect(_ => {
    if (Array.isArray(value)) {
      const initSelected = value.map(item => {
        if (item && typeof item === 'object') {
          return String(item[optValue]);
        }
        return String(item);
      });

      setSelectedRowKeys(initSelected);
      initSselectedRef.current = {
        selectedRows: initSelected.map(id => ({ id })),
        selectedRowKeys: initSelected,
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  useEffect(_ => {
    // onChange([], []);
    if (onChangeTableData && type === false) {
      // 将 API 返回的结果直接作为一对多数据
      onChangeTableData(tableData);
    }
    if (Array.isArray(tableData)) {
      const { selectedRows, selectedRowKeys } = initSselectedRef.current;

      tableData.forEach(item => {
        const index = selectedRowKeys.findIndex(id => id === item.id);
        if (index > -1) {
          selectedRows.splice(index, 1, item);
        }
      })

      if (type === 'checkbox') {
        if (initRef.current) {
          const rst = getSelectedData();
          setSelectedRowKeys(rst.selectedRowKeys);
        } else {
          initRef.current = true;
        }
      }
    }
  }, [tableData])
  useWillUnmount(_ => {
    // 会触发意外的回收
    // removeModel(namespace);
  })

  function handleRowClassName(record) {
    if (operationData.id === record.id) {
      return 'ZEleA-table-selected';
    }
  }

  function handleChange(selectedRowKeys, selectedRows) {
    const { current } = tableProps.pagination;
    const { searchData } = getPageData(namespace);

    let sKeys = selectedRowKeys;
    let sRows = selectedRows;

    if (type === 'checkbox') {
      selectedRef.current[JSON.stringify({ ...searchData, current })] = {
        selectedRows,
        selectedRowKeys,
      }

      const rst = getSelectedData();
      sKeys = rst.selectedRowKeys;
      sRows = rst.selectedRows;
    } else {
      onChange(sRows, sKeys);
    }
    setSelectedRowKeys(sKeys);
  }

  function getSelectedData() {
    const { selectedRows, selectedRowKeys } = initSselectedRef.current;
    const sKeys = [];
    const sRows = [];


    Object.values(selectedRef.current).forEach(item => {
      if (item) {
        const { selectedRows, selectedRowKeys } = item;
        sKeys.push(...selectedRowKeys);
        sRows.push(...selectedRows);
      }
    })

    sKeys.push(...selectedRowKeys);
    sRows.push(...selectedRows);

    const uniq = _.uniqBy(sRows, 'id');

    onChange(uniq, uniq.map(i => i.id));
    return {
      selectedRowKeys: uniq.map(i => i.id),
      selectedRows: uniq,
    }
  }

  function handleCancelInitSelected(record, selected) {
    const { selectedRowKeys, selectedRows } = initSselectedRef.current;
    if (!selected && Array.isArray(selectedRowKeys)) {
      const filter = selectedRowKeys.filter(id => id !== record.id);
      initSselectedRef.current = {
        selectedRows: selectedRows.filter(i => i.id !== record.id),
        selectedRowKeys: filter,
      }
    }
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
      // rowKey={rowKey || optValue}
      rowKey={record => record[rowKey] || record[optValue] || record._index}
      size="small"
      bordered={false}
      rowClassName={handleRowClassName}
      // dataSource={props.data || tableData}
      dataSource={setBaseIndex(props.data || tableData)}
      {...tableProps}
      {...propsCfg}

      pagination={
        pagination ?
          {
            ...tableProps.pagination,
            size: 'small',
          }
          : false
      }
      rowSelection={
        rowSelection ? {
          type: type,
          selectedRowKeys,
          onChange: handleChange,
          onSelect: handleCancelInitSelected,
          getCheckboxProps: requireValid ? handleDisabled : undefined,
        } : rowSelection
      }
    />
  </Render>
}

function setBaseIndex(arr) {
  if (Array.isArray(arr)) {
    return arr.map((item, i) => {
      item['_index'] = `_${i}`;
      return item;
    })
  }

  return arr;
}