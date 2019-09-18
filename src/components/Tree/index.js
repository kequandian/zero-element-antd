import React, { useState } from 'react';
import { Spin, Input, Tree } from 'antd';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatAPI } from 'zero-element/lib/utils/format';
import { query } from 'zero-element/lib/utils/request';

import read from './read';
import findNode from './findNode';
import findNodes from './findNodes';
import checkData from './checkData';

const { Search } = Input;

export default (props) => {
  const { API, searchField = 'search', namespace, onChange } = props;

  const [treeData, setTreeData] = useState({});
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeLoading, setTreeLoading] = useState(false);

  useDidMount(_ => {
    if (API) {
      handleLoadInitData();
    }
  });


  function handleLoadInitData() {
    const api = formatAPI(API.initAPI, { namespace });

    setTreeLoading(true);
    query(api).then(response => {
      const { status, data } = response;
      const { code, data: rspData } = data;

      if (status === 200 && code === 200) {
        setTreeData(rspData);
      } else {
        throw new Error('服务器返回了非预期的数据格式');
      }
    }).catch(err => console.warn('数据初始化失败', err))
      .finally(_ => setTreeLoading(false));
  }
  function handleLoadData(treeNode) {
    const { id } = treeNode.props;
    const api = formatAPI(API.appendAPI, {
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
    const id = selectedKeys[0];
    const find = findNode(id, treeData);

    onChange({
      id,
      ...find,
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
    const api = formatAPI(API.searchAPI, {
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

  return <Spin spinning={treeLoading}>
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

}