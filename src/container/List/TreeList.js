import React, { useState, useEffect } from 'react';
import useBaseList from 'zero-element/lib/helper/list/useBaseList';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatTableFields } from './utils/format';
import { getActionItem } from '@/utils/readConfig';
import { Table, Tree, Input, Spin } from 'antd';
import { Render } from 'zero-element-global/lib/layout';
import { formatAPI } from 'zero-element/lib/utils/format';
import { query } from 'zero-element/lib/utils/request';

import { Flex } from 'layout-flex';

const { Search } = Input;
const { TreeNode } = Tree;
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
  const [treeData, setTreeData] = useState({});
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeLoading, setTreeLoading] = useState(false);

  const listProps = useBaseList({
    namespace,
    modelPath: 'listData',
    extraData,
  }, config);

  const { loading, data, handle, modelStatus } = listProps;
  const { onGetList, onClearList } = handle;

  const columns = formatTableFields(fields, operation, handle);

  useDidMount(_ => {
    if (API.listAPI) {
      if (API.listAPI.indexOf('<') === -1) {
        onGetList({});
      } else {
        if (treeAPI) {
          handleLoadInitData();
        }
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

  function handleLoadInitData() {
    const api = formatAPI(treeAPI.initAPI, { namespace });

    setTreeLoading(true);
    query(api).then(response => {
      const { status, data } = response;
      const { code, data: rspData } = data;

      if (status === 200 && code === 200) {
        setTreeData(rspData);
      }
    }).catch(err => console.warn('数据初始化失败', err))
      .finally(_ => setTreeLoading(false));
  }
  function handleLoadData(treeNode) {
    const { id } = treeNode.props;
    const api = formatAPI(treeAPI.appendAPI, {
      namespace,
      data: { id },
    });

    setTreeLoading(true);
    return query(api).then(response => {
      const { status, data } = response;
      const { code, data: rspData } = data;
      if (status === 200 && code === 200) {

        const find = findNode(id, treeData);
        find.children = find.children || [];
        find.children.push(...checkData(rspData));
        setTreeData({ ...treeData });
      }
    }).catch(err => console.warn('子项获取失败', err))
      .finally(_ => setTreeLoading(false));
  }
  function handleExpand(expandedKeys) {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  }
  function handleSelect(selectedKeys) {
    setExtraData({
      id: selectedKeys[0],
    });
  }
  function handleLocalSearch(e) {
    const { value } = e.target;

    if (value) {
      const find = findNodes(value, treeData);

      setExpandedKeys(find.map(i => String(i.id)));
      setAutoExpandParent(true);
    }
  }
  function handleRemoteSearch(value) {
    const api = formatAPI(treeAPI.searchAPI, {
      namespace,
    });

    setTreeLoading(true);
    return query(api, {
      [searchField]: value,
    }).then(response => {
      const { status, data } = response;
      const { code, data: rspData } = data;

      if (status === 200 && code === 200) {
        const rst = checkData(rspData);
        if (rst) {
          rst.forEach(item => {
            const find = findNode(item.pid, treeData);
            find.children = find.children || [];
            find.children.push(item);
          });
        }
        setTreeData({ ...treeData });
        // 构造一个对象，而不使用 react 的合成事件
        handleLocalSearch({ target: { value } });
      }
    }).catch(err => console.warn('搜索失败', err))
      .finally(_ => setTreeLoading(false));
  }

  function renderTree() {
    return <FlexItem>
      <Spin spinning={treeLoading}>
        <Search
          style={{
            marginTop: 16,
            marginBottom: 8,
          }}
          placeholder="搜索"
          onChange={handleLocalSearch}
          onSearch={handleRemoteSearch}
        />
        <Tree
          showLine
          autoExpandParent={autoExpandParent}
          expandedKeys={expandedKeys}
          loadData={handleLoadData}
          onExpand={handleExpand}
          onSelect={handleSelect}
        >
          {read(treeData)}
        </Tree>
      </Spin>
    </FlexItem>
  }

  return <Render n={layout} {...layoutConfig}>
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actions.map((action, i) => getActionItem({
        key: i,
        ...action,
      }, modelStatus, namespace, handle))}
    </Render>
    <Flex align="flex-start">
      {treeAPI ? (renderTree()) : null}
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

/**
 * 读取后台返回的扁平数据, 从数据中找到所需的数组数据
 * @param {array} rspData 后台返回的 response 的数据
 * @returns {array} listData 返回数组数据
 */
function checkData(rspData) {
  const listData = Array.isArray(rspData) ? rspData :
    Array.isArray(rspData.records) ? rspData.records : rspData.children;

  if (!Array.isArray(listData)) {
    throw new Error('后台未返回预期数据格式');
  }
  return listData;
}
/**
 * 把扁平的数组根据 pid 格式化为树状
 * 
 * @param {array} list 扁平的数组
 * @returns {array} tree 树状结构
 */
function formatToTree(list) {
  const rst = [];
  const IDRecords = {};

  const cloneList = list.map(item => {
    const clone = {
      ...item,
      key: item.id,
    };
    IDRecords[item.id] = clone;
    return clone;
  });

  cloneList.forEach(node => {
    const parentNode = IDRecords[node.pid];

    if (parentNode) {
      parentNode.children = parentNode.children || [];
      parentNode.children.push(node);
    } else {
      rst.push(node); v
    }
  });

  return rst;
}

/**
 * 渲染树状数据
 *
 * @param {array|object} item 数组或对象
 * @returns react node
 */
function read(item) {
  if (Array.isArray(item)) {
    return item.map(i => read(i));
  }
  if (item.children) {
    return <TreeNode key={item.id} id={item.id} title={item.title}>
      {read(item.children)}
    </TreeNode>;
  }
  return <TreeNode key={item.id} id={item.id} title={item.title} />;
}

/**
 * 根据 id 找到节点
 *
 * @param {string} id
 * @param {object} treeData
 * @returns object node
 */
function findNode(id, treeData) {
  const stack = [treeData];
  let rst;
  while (stack.length) {
    const item = stack.shift();
    if (item.id === id) {
      rst = item;
      break;
    }
    if (Array.isArray(item.children)) {
      stack.push(...item.children);
    }
  }
  return rst;
}

function findNodes(value, treeData) {
  const stack = [treeData];
  const rst = [];
  while (stack.length) {
    const item = stack.shift();
    const { title = '', children } = item;
    if (title.indexOf(value) > -1) {
      rst.push(item);
    }
    if (Array.isArray(children)) {
      stack.push(...children);
    }
  }
  return rst;
}