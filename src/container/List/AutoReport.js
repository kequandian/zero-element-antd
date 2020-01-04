import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { Render } from 'zero-element-global/lib/layout';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { getActionItem } from '@/utils/readConfig';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatTableFields } from './utils/format';

export default function AutoReport(props) {
  const { namespace, config, extraData } = props;
  const {
    API,
    layout = 'Empty', layoutConfig = {},
    props: propsCfg = {},
    actions,
    actionLayout = 'Row',
    actionLayoutConfig = {},
    operation,
    pageSize,
  } = config;

  const listProps = useBaseList({
    namespace,
    modelPath: 'listData',
    extraData,
  }, config);
  const { loading, data, handle, modelStatus } = listProps;
  const { onGetList, onClearList } = handle;
  const { listData } = modelStatus;
  const { rows, header, columns, ...pagination } = listData;

  const [tColumns, setTColumns] = useState([]);
  const [records, setRecords] = useState([]);

  useDidMount(_ => {
    if (API.listAPI) {
      onGetList({
        pageSize: pageSize,
      });
    }
  });
  useEffect(_ => {
    if (Array.isArray(header) && Array.isArray(columns) && Array.isArray(rows)) {
      const { columns: rst } = formatTableFields(
        formatColumns(header, columns),
        operation,
        {
          ...handle,
        },
        {
          namespace,
          extraData,
        });

      setTColumns(rst);
      setRecords(rows.map((item, i) => ({ id: i, ...item })));
    }
  }, [rows, header, columns]);
  useWillUnmount(onClearList);


  const actionsItems = actions.map((action, i) => getActionItem({
    key: i,
    ...action,
  }, modelStatus, handle, {
    namespace,
    extraData,
  }));

  function handlePageChange(current, pageSize) {

    onGetList({
      current,
      pageSize,
    });
  }

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
      rowClassName={handleRowClassName}
      columns={tColumns}
      dataSource={records}
      loading={loading}
      pagination={{
        showSizeChanger: true,
        ...pagination,
        onChange: handlePageChange,
        onShowSizeChange: handlePageChange,
      }}
      {...propsCfg}
    />
  </Render>
}

/**
 * 返回 标准 columns
 * @param {array} titleList 
 * @param {array} typeList 
 */
function formatColumns(titleList, typeList) {
  const rst = [];
  titleList.forEach((title, i) => {
    rst.push({
      label: title,
      field: title,
      ...typeMap[typeList[i]],
    });
  });
  return rst;
}

const typeMap = {
  'D': { // 金钱
    valueType: 'currency',
    align: 'right',
  },
  'T': {},// 时间
  'P': { // 百分比
    valueType: 'percentage',
    align: 'right',
  },
  'C': { // 数量
    align: 'right',
  },
  'S': {}, // 字符串
};