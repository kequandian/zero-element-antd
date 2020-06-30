import { useEffect, useRef, useState } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';

import useOperation from './useOperation';
import useRowSelection from './useRowSelection';
import { formatTableFields } from './format';
import { getActionItem } from '@/utils/readConfig';


export default function useListHandle({
  namespace,
  config,

  props,
}) {
  const listProps = useBaseList({
    namespace,
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
  const [rowSelection, onSetSelection] = useRowSelection(handle);

  const { listData } = model;
  const { records, ...pagination } = listData;

  const { columns, width } = formatTableFields(orderFields, operation, {
    ...handle,
    onClickOperation,
    onFieldsOrder,
  }, {
    namespace,
    extraData: {},
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
    if (batchOperation !== undefined) {
      onSetSelection(batchOperation);
    }
  }, [batchOperation]);

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

  const tableProps = {
    columns,
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
    extraData: {},
    config,
  }));

  return [tableProps, data, handle, actionsItems, {
    operationData: oData,
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