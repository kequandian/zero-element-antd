import React, { useState, useRef } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatTableFields } from './utils/format';
import { getActionItem } from '@/utils/readConfig';
import { Table } from 'antd';
import { Render } from 'zero-element-global/lib/layout';
import { formatAPI } from 'zero-element/lib/utils/format';
import { query } from '@/utils/request';

export default function TreeTable(props) {
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

  const { handle, modelStatus } = listProps;
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const finalId = useRef(null);

  const columns = formatTableFields(fields, operation, {
    ...handle,
    onRefresh: handleRefresh,
  }, {
    namespace,
    extraData,
  });

  useDidMount(_ => {
    if (API.listAPI) {
      handleInitData({});
    }
  });

  function handleInitData() {
    const api = formatAPI(API.listAPI, { namespace });

    setLoading(true);
    query(api)
      .then(data => setTreeData([formatTree(data)]))
      .catch(err => console.warn('数据初始化失败', err))
      .finally(_ => setLoading(false))
  }
  function handleExpand(expanded, record) {
    if (expanded && API.appendAPI) {
      handleAppend(record.id);
    }
  }
  function handleAppend(id) {
    finalId.current = id;
    const api = API.appendAPI.replace(/(\<\w+\>)/, id);
    setLoading(true);
    query(api)
      .then(data =>
        setTreeData([
          formatTree(
            appendNode(id, treeData, data.children)[0]
          )
        ])
      )
      .catch(err => console.warn('数据初始化失败', err))
      .finally(_ => setLoading(false));
  }
  function handleRefresh() {
    if (finalId.current) {
      handleAppend(finalId.current);
    }
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
      dataSource={treeData}
      columns={columns}
      loading={loading}
      pagination={false}
      {...propsCfg}
      onExpand={handleExpand}
    />
  </Render>
}

function formatTree(data) {
  const stack = [data];
  const rst = data;

  while (stack.length) {
    const item = stack.shift();

    if (item.children) {
      stack.push(...item.children);
    } else {
      item.children = [];
    }
  }

  return rst;
}
function appendNode(id, tree, data) {
  const stack = [...tree];
  let target;

  while (stack.length) {
    const item = stack.shift();

    if (item.id === id) {
      target = item;
      break;
    }
    if (item.children) {
      stack.push(...item.children);
    }
  }

  if (target) {
    target.children = data;
  }

  return [...tree];
}