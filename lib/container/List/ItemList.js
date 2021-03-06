function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Render } from 'zero-element/lib/config/layout';
import useListHandle from "./utils/useListHandle";
import { Pagination, Empty } from 'antd';
export default function ItemList(props) {
  const {
    namespace,
    config,
    extraData,
    Item,
    ...restProps
  } = props;
  const {
    layout = 'Empty',
    layoutConfig = {},
    props: propsCfg = {},
    actionLayout = 'Row',
    actionLayoutConfig = {}
  } = config;
  const [tableProps, tableData, handle, actionsItems, {
    operationData
  }] = useListHandle({
    namespace,
    extraData,
    config,
    props
  });

  if (typeof Item !== 'function') {
    console.warn('请在 props 里传入 Item');
    return '未提供有效的 Item';
  }

  const listData = props.data || tableData || [];
  return /*#__PURE__*/React.createElement(Render, _extends({
    n: layout
  }, layoutConfig, {
    handle: handle,
    namespace: namespace
  }), /*#__PURE__*/React.createElement(Render, _extends({
    n: actionLayout
  }, actionLayoutConfig), actionsItems), /*#__PURE__*/React.createElement(Render, _extends({
    n: "Items"
  }, layoutConfig, {
    handle: handle,
    namespace: namespace
  }), listData.map((item, i) => /*#__PURE__*/React.createElement(Item, _extends({
    key: item.id,
    namespace: namespace
  }, tableProps, propsCfg, restProps, {
    index: i,
    data: item,
    handle: handle
  })))), listData.length ? null : /*#__PURE__*/React.createElement(Empty, null), tableProps.pagination ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Pagination, tableProps.pagination)) : null);
}