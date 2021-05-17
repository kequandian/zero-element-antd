import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Spin, Input, Tree, Empty } from 'antd';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatAPI } from 'zero-element/lib/utils/format';
import { query } from 'zero-element-antd/lib/utils/request';

import findNode from './findNode';
import findNodes from './findNodes';
import formatInit from './formatInit';
import checkData from './checkData';

const { Search } = Input;

export default forwardRef(function TreeWrapped(props, ref) {
  const {
    API, searchField = 'search',
    namespace,
    initData = {},
    onChange,
    defaultAelectedKeys,
    childrenColumnName = 'children',
    id = 'id',
    ...rest
  } = props;

  const [treeData, setTreeData] = useState(initData);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeLoading, setTreeLoading] = useState(false);

  const switchicon = <svg t="1621219824765" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2662" width="16" height="16"><path d="M974.99592797 774.77400863H49.00407203V220.36641817h857.08789887c38.11120672 0 69.04204115 30.93083443 69.04204115 69.04204115v485.36554931h-0.13808408zM627.71446098 220.36641817c0-63.9329301-51.78153086-115.71446098-115.71446098-115.71446098H49.00407203v115.71446098h578.71038895" fill="#CE9F06" p-id="2663"></path><path d="M164.718533 620.25792053V273.11453762h694.562934v347.14338291h-694.562934z" fill="#FFFFFF" p-id="2664"></path><path d="M974.99592797 848.09665633V398.49488435c0-31.89742302-25.95980747-57.85723049-57.85723049-57.85723048H106.86130252c-31.89742302 0-57.85723049 25.95980747-57.85723049 57.85723048v449.4636879c0 39.35396347 31.89742302 71.38947055 71.38947055 71.38947056h783.35099891c39.35396347 0.13808409 71.25138647-31.89742302 71.25138648-71.25138648z" fill="#FFCD2C" p-id="2665"></path></svg>;
  const icon = <svg t="1621219862707" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3504" width="16" height="16"><path d="M642.56 61.952v237.568c0 17.92 14.336 32.256 32.256 32.256h233.984v536.576c0 17.92-14.336 32.256-32.256 32.256H142.336c-17.92 0-32.256-14.336-32.256-31.744V94.208c0-17.92 14.336-32.256 32.256-32.256h500.224zM287.744 242.176v90.112h266.24V242.176h-266.24z m0 179.712V512h443.904V421.888H287.744z m0 180.224v90.112h443.904v-90.112H287.744z m449.024-539.136l171.008 173.568c1.024 1.024 1.024 3.072 0 4.608-0.512 0.512-1.536 1.024-2.048 1.024h-142.336c-17.92 0-32.256-14.336-32.256-32.256V65.536c0-1.536 1.536-3.072 3.072-3.072s2.048 0 2.56 0.512z" fill="#1296db" p-id="3505"></path></svg>;

  useImperativeHandle(ref, () => ({
    onReInit: handleLoadInitData,
  }));

  useDidMount(_ => {
    if (API) {
      handleLoadInitData();
    }
  });
  useEffect(_ => {
    handleSelectChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKeys]);

  function handleLoadInitData() {
    if (API.initAPI === undefined) {
      return false;
    }

    const api = formatAPI(API.initAPI, { namespace });

    setTreeLoading(true);
    query(api)
      .then(data => {
        const rst = formatInit(
          JSON.parse(JSON.stringify(data)),
          childrenColumnName,
          id,
        );
        console.log(rst);
        setTreeData(rst);
        if (defaultAelectedKeys) {
          handleSelect(defaultAelectedKeys);
        } else if (rst.length === 1) {
          const keys = [String(rst[0].id)];
          handleSelect(keys);
          setExpandedKeys(keys);
        }
      })
      .catch(err => console.warn('数据初始化失败', err))
      .finally(_ => setTreeLoading(false));
  }
  function handleLoadData(treeNode) {
    const { id, key } = treeNode;

    if (key && !expandedKeys.includes(key)) {
      handleExpand([
        ...expandedKeys,
        key,
      ]);
    }

    if (API.appendAPI === undefined) {
      return new Promise((res) => res());;
    }

    const api = formatAPI(API.appendAPI, {
      namespace,
      data: { id },
    });

    setTreeLoading(true);
    return query(api)
      .then(data => {
        const find = findNode(id, treeData);
        find.children = find.children || [];
        find.children.push(...checkData(data));
        setTreeData({ ...treeData });
      })
      .catch(err => console.warn('子项获取失败', err))
      .finally(_ => setTreeLoading(false));
  }
  function handleExpand(expandedKeys) {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  }
  function handleSelect(selectedKeys) {
    setSelectedKeys(selectedKeys);

    if (selectedKeys[0] && !expandedKeys.includes(selectedKeys[0])) {
      handleExpand([
        ...expandedKeys,
        selectedKeys[0]
      ]);
    }
  }
  function handleSelectChange() {
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
    })
      .then(data => {
        const rst = checkData(data);
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
      })
      .catch(err => console.warn('搜索失败', err))
      .finally(_ => setTreeLoading(false));
  }

  const treeProps = {
    loadData: handleLoadData,
    selectedKeys,
    onSelect: handleSelect,
    ...rest,
  };
  if (treeProps.expandedKeys || expandedKeys.length) {
    treeProps.expandedKeys = treeProps.expandedKeys || expandedKeys;
    treeProps.onExpand = treeProps.onExpand || handleExpand;
  }

  return <Spin spinning={treeLoading}>
    {API.searchAPI ? (
      <Search
        style={{
          // marginTop: 16,
          marginBottom: 8,
        }}
        placeholder="搜索"
        onChange={handleLocalSearch}
        onSearch={handleRemoteSearch}
      />
    ) : null}
    {treeData && (treeData.length || Object.keys(treeData).length) ? (
      <Tree
        showLine
        // showIcon
        autoExpandParent={autoExpandParent}
        {...treeProps}
        treeData={treeData}
        style={{minWidth:'150px', paddingRight:'10px'}}
      />
    ) : <Empty />}
  </Spin>

})