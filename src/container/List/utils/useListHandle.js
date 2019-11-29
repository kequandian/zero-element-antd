import { useEffect, useRef } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';

import useOperation from './useOperation';
import { formatTableFields } from './format';
import { getActionItem } from '@/utils/readConfig';
import { getShareData } from '@/utils/share';


export default function useListHandle({
  namespace,
  extraData,
  config,

  forceInitList,
}) {
  const listProps = useBaseList({
    namespace,
    modelPath: 'listData',
    extraData,
  }, config);
  const [oData, onClickOperation] = useOperation();
  const firstGetList = useRef(true);

  const {
    API = {},
    pageSize,
    fields, operation, actions = [],
    share,
  } = config;

  const { loading, data, handle, modelStatus } = listProps;
  const { onGetList, onClearList } = handle;
  const { listData } = modelStatus;
  const { records, ...pagination } = listData;

  const columns = formatTableFields(fields, operation, {
    ...handle,
    onClickOperation,
  }, {
    namespace,
    extraData,
  });

  useDidMount(_ => {
    if (API.listAPI) {
      onGetList({
        pageSize: pageSize,
        queryData: getShareData(share),
      });
    }
  });
  useWillUnmount(onClearList);
  useEffect(_ => {
    if (firstGetList.current) {
      firstGetList.current = false;
    } else {
      if (forceInitList !== undefined && API.listAPI) {
        onGetList({
          pageSize: pageSize,
          queryData: getShareData(share),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceInitList])

  function handlePageChange(current, pageSize) {

    onGetList({
      current,
      pageSize,
      queryData: getShareData(share),
    });
  }

  const tableProps = {
    columns,
    loading,
    pagination: {
      ...pagination,
      onChange: handlePageChange,
    }
  };
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