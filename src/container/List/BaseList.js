import React from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatTableFields } from './utils/format';
import { getActionItem } from '@/utils/readConfig';
import { Table } from 'antd';
import { Render } from 'zero-element-global/lib/layout';

export default function BaseList(props) {
  const { namespace, config, extraData } = props;
  const {
    layout = 'Empty', layoutConfig = {},
    API = {},
    fields, operation, actions = [],
    props: propsCfg = {},
    actionLayout = 'Empty',
    actionLayoutConfig = {},
  } = config;
  const listProps = useBaseList({
    namespace,
    modelPath: 'listData',
    extraData,
  }, config);

  const { loading, data, handle, modelStatus } = listProps;
  const { onGetList, onClearList } = handle;
  const { listData } = modelStatus;
  const { records, ...pagination } = listData;

  const columns = formatTableFields(fields, operation, handle, {
    namespace,
    extraData,
  });

  useDidMount(_ => {
    if (API.listAPI) {
      onGetList({});
    }
  });
  useWillUnmount(onClearList);

  function handlePageChange(current, pageSize) {
    onGetList({
      current,
      pageSize,
    });
  }

  return <Render n={layout} {...layoutConfig}
    handle={handle}
    namespace={namespace}
  >
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actions.map((action, i) => getActionItem({
        key: i,
        ...action,
      }, modelStatus, handle, {
        namespace,
        extraData,
      }))}
    </Render>
    <Table
      rowKey="id"
      size="middle"
      dataSource={props.data || data}
      columns={columns}
      loading={loading}
      pagination={{
        ...pagination,
        onChange: handlePageChange,
        // onShowSizeChange: handlePageChange,
        // showSizeChanger: true,
      }}
      {...propsCfg}
    />
  </Render>
}