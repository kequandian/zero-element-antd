import { useEffect, useRef } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';

import useOperation from './useOperation';
import useRowSelection from './useRowSelection';
import { formatTableFields } from './format';
import { getActionItem } from '@/utils/readConfig';


export default function useListHandle({
  namespace,
  extraData,
  config,

  props,
}) {
  const listProps = useBaseList({
    namespace,
    modelPath: 'listData',
    extraData,
  }, config);
  const [oData, onClickOperation] = useOperation();
  const firstGetList = useRef(true);
  const {
    forceInitList, keepData, batchOperation,
    pagination: propsPagination = true,
    mountFetch = true,
  } = props;

  const {
    API = {},
    pageSize,
    fields, operation, actions = [],
    scroll = {},
  } = config;

  const { loading, data, handle, modelStatus } = listProps;
  const { onGetList, onClearList, onCanRecyclable } = handle;
  const [rowSelection, onSetSelection] = useRowSelection(handle);

  const { listData } = modelStatus;
  const { records, ...pagination } = listData;

  const { columns, width } = formatTableFields(fields, operation, {
    ...handle,
    onClickOperation,
  }, {
    namespace,
    extraData,
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

  useWillUnmount(_ => {
    if (keepData) {
      onCanRecyclable();
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
  }, modelStatus, handle, {
    namespace,
    extraData,
  }));

  return [tableProps, data, handle, actionsItems, {
    operationData: oData,
  }];
}