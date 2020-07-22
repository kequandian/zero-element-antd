import React, { useEffect, useRef, useState } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Menu, Dropdown, Button } from 'antd';
import useOperation from './useOperation';
import useRowSelection from './useRowSelection';
import { formatTableFields } from './format';
import { getActionItem } from '@/utils/readConfig';
import { DownOutlined } from '@ant-design/icons';

export default function useListHandle({
  namespace,
  config,
  extraData,
  props,
}) {
  const dataPath = props.MODAL ? 'temp_modal' : 'listData';
  const listProps = useBaseList({
    namespace,
    extraData,
    dataPath,
  }, config);
  const [oData, onClickOperation] = useOperation();
  const firstGetList = useRef(true);
  const {
    forceInitList, keepData = true, batchOperation,
    pagination: propsPagination = true,
    mountFetch = true,
  } = props;

  const {
    API = {},
    pageSize,
    fields, operation, actions = [],
    scroll = {},
  } = config;

  const [order, setOrder] = useState(null);
  const [orderFields, setOrderFields] = useState(fields);

  const { loading, data, handle, model } = listProps;
  const { onGetList, onClearList } = handle;
  const rowSelection = useRowSelection(handle);

  const listData = model[dataPath] || {};
  const { records, ...pagination } = listData;

  const { columns, width } = formatTableFields(orderFields, operation, {
    ...handle,
    onClickOperation,
    onFieldsOrder,
  }, {
    namespace,
    extraData,
    fields,
    model,
  });

  useDidMount(_ => {
    if (mountFetch && API.listAPI) {
      onGetList({
        pageSize: pageSize,
        ...pagination,
      });
    }
  });

  useEffect(_ => {
    if (firstGetList.current) {
      firstGetList.current = false;
    } else {
      if (forceInitList !== undefined && API.listAPI) {
        onGetList({
          pageSize: pageSize,
          ...pagination,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceInitList]);

  useEffect(_ => {
    if (fields) {
      if (order) {
        setOrderFields(
          filterFields(fields, order)
        );
      } else {
        setOrderFields(fields)
      }
    }
  }, [fields, order])

  useWillUnmount(_ => {
    if (keepData) {
    } else {
      onClearList();
    }
  });

  function handlePageChange(current, pageSize) {

    onGetList({
      current,
      pageSize,
    });
  }

  function handleFilterSorter(pagination, filters, sorter, extra) {
    const { current, pageSize } = pagination;
    onGetList({
      current,
      pageSize,
      sorter,
    });
  }

  function onFieldsOrder(order) {
    setOrder(order);
  }

  function handleMenuClick(e) {
    const { key } = e;
    const batchItem = batchOperation[key];
    if (batchItem && typeof batchItem.onClick === 'function') {
      batchItem.onClick({
        selectedRowKeys: rowSelection.selectedRowKeys,
        selectedRows: rowSelection.selectedRows,
        onRefresh: handle.onRefresh,
      });
    }
  }

  function renderBatchOperation() {
    if (Array.isArray(batchOperation) && rowSelection.selectedRowKeys.length) {
      const menu = (
        <Menu onClick={handleMenuClick}>
          {batchOperation.map((item, i) => {
            return <Menu.Item key={i}>
              {item.title}
            </Menu.Item>
          })}
        </Menu>
      );
      return <Dropdown overlay={menu}>
        <Button>
          批量操作 <DownOutlined />
        </Button>
      </Dropdown>
    }
    return null;
  }

  const tableProps = {
    columns: props.columns || columns,
    loading,
    rowSelection: batchOperation ? rowSelection : undefined,
    onChange: handleFilterSorter,
    pagination: propsPagination ? {
      showSizeChanger: true,
      ...pagination,
      onChange: handlePageChange,
      onShowSizeChange: handlePageChange,
    }
      : false,
  };
  if (width > 0) {
    tableProps.scroll = {
      x: width,
      y: scroll.y,
    }
  }
  const actionsItems = actions.map((action, i) => getActionItem({
    key: i,
    ...action,
  }, model, handle, {
    namespace,
    extraData,
    config,
    hooks: props.hooks,
  }));

  return [tableProps, data, handle, actionsItems, {
    operationData: oData,
    renderBatchOperation,
  }];
}

function filterFields(fields, order) {
  const rst = [];
  order.forEach(key => {
    const find = fields.find(i => i.field === key);
    if (find) {
      rst.push(find);
    }
  })
  return rst;
}