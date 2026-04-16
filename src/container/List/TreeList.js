import React, { useState, useEffect } from 'react';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatTableFields } from './utils/format';
import { getActionItem } from '@/utils/readConfig';
import { ProTable } from '@ant-design/pro-components';
import { Render } from 'zero-element/lib/config/layout';

import useListHandle from './utils/useListHandle';
import Flex from '@/layout/Flex';

import Tree from '@/components/Tree';

const { FlexItem } = Flex;

/**
 * 左边是一个树状选择，右边是 Table
 */
export default function TreeList(props) {
  const { namespace, config } = props;
  const {
    layout = 'Empty', layoutConfig = {},
    API = {},
    fields, operation, actions = [],
    props: propsCfg = {},
    actionLayout = 'Row',
    actionLayoutConfig = {},
    field = 'children',
    tree = {},
  } = config;

  const { API: treeAPI, searchField = 'search' } = tree;

  const [extraData, setExtraData] = useState({});

  const [
    tableProps, tableData, handle, actionsItems,
  ] = useListHandle({
    namespace,
    extraData,
    config,

    props,
  });

  const { onGetList, onClearList } = handle;

  useDidMount(_ => {
    if (API.listAPI) {
      if (API.listAPI.indexOf('<') === -1) {
        onGetList({});
      }
    }
  });
  useEffect(_ => {
    if (extraData.id) {
      onGetList({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extraData]);
  // useWillUnmount(onClearList);

  function handleSelect(data) {
    setExtraData(data);
  }

  return <Render n={layout} {...layoutConfig}>
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actionsItems}
    </Render>
    <Flex align="flex-start">
      {treeAPI ? (<FlexItem>
        <br />
        <Tree
          API={treeAPI}
          searchField={searchField}
          namespace={namespace}
          onChange={handleSelect}
        />
      </FlexItem>) : null}
      <FlexItem flex={1}>
        <ProTable
          rowKey="id"
          dataSource={props.data || tableData}
          childrenColumnName={field}
          {...tableProps}
          {...propsCfg}
          search={false}
          options={false}
          pagination={tableProps.pagination}
        />
      </FlexItem>
    </Flex>
  </Render>
}