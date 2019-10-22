import React, { useState, useEffect } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatTableFields } from './utils/format';
import { getActionItem } from '@/utils/readConfig';
import { Table } from 'antd';
import { Render } from 'zero-element-global/lib/layout';

import { Flex } from 'layout-flex';

import Tree from '@/components/Tree';

const { FlexItem } = Flex;

export default function TreeList(props) {
  const { namespace, config } = props;
  const {
    layout = 'Empty', layoutConfig = {},
    API = {},
    fields, operation, actions = [],
    props: propsCfg = {},
    actionLayout = 'Empty',
    actionLayoutConfig = {},
    field = 'children',
    tree = {},
  } = config;

  const { API: treeAPI, searchField = 'search' } = tree;

  const [extraData, setExtraData] = useState({});

  const listProps = useBaseList({
    namespace,
    modelPath: 'listData',
    extraData,
  }, config);

  const { loading, data, handle, modelStatus } = listProps;
  const { onGetList, onClearList } = handle;

  const columns = formatTableFields(fields, operation, handle, {
    namespace,
    extraData,
  });

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
  useWillUnmount(onClearList);

  function handleSelect(data) {
    setExtraData(data);
  }

  return <Render n={layout} {...layoutConfig}>
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actions.map((action, i) => getActionItem({
        key: i,
        ...action,
      }, modelStatus, handle, {
        namespace,
        extraData,
      }))}
    </Render>
    <Flex align="flex-start">
      {treeAPI ? (<FlexItem>
        <Tree
          API={treeAPI}
          searchField={searchField}
          namespace={namespace}
          onChange={handleSelect}
        />
      </FlexItem>) : null}
      <FlexItem flex={1}>
        <Table
          rowKey="id"
          dataSource={props.data || data}
          columns={columns}
          loading={loading}
          childrenColumnName={field}
          {...propsCfg}
        />
      </FlexItem>
    </Flex>
  </Render>
}