function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatTableFields } from "./utils/format";
import { getActionItem } from "../../utils/readConfig";
import { Table } from 'antd';
import { Render } from 'zero-element/lib/config/layout';
import useListHandle from "./utils/useListHandle";
import Flex from "../../layout/Flex";
import Tree from "../../components/Tree";
const {
  FlexItem
} = Flex;
/**
 * 左边是一个树状选择，右边是 Table
 */

export default function TreeList(props) {
  const {
    namespace,
    config
  } = props;
  const {
    layout = 'Empty',
    layoutConfig = {},
    API = {},
    fields,
    operation,
    actions = [],
    props: propsCfg = {},
    actionLayout = 'Row',
    actionLayoutConfig = {},
    field = 'children',
    tree = {}
  } = config;
  const {
    API: treeAPI,
    searchField = 'search'
  } = tree;
  const [extraData, setExtraData] = useState({});
  const [tableProps, tableData, handle, actionsItems] = useListHandle({
    namespace,
    extraData,
    config,
    props
  });
  const {
    onGetList,
    onClearList
  } = handle;
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
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [extraData]); // useWillUnmount(onClearList);

  function handleSelect(data) {
    setExtraData(data);
  }

  return /*#__PURE__*/React.createElement(Render, _extends({
    n: layout
  }, layoutConfig), /*#__PURE__*/React.createElement(Render, _extends({
    n: actionLayout
  }, actionLayoutConfig), actionsItems), /*#__PURE__*/React.createElement(Flex, {
    align: "flex-start"
  }, treeAPI ? /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Tree, {
    API: treeAPI,
    searchField: searchField,
    namespace: namespace,
    onChange: handleSelect
  })) : null, /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement(Table, _extends({
    rowKey: "id",
    dataSource: props.data || tableData,
    childrenColumnName: field
  }, tableProps, propsCfg)))));
}