import React from 'react';
import { Render } from 'zero-element-global/lib/layout';
import useListHandle from './utils/useListHandle';
import { Pagination } from 'antd';

export default function ItemList(props) {
  const {
    namespace, config, extraData, forceInitList,
    Item,
  } = props;
  const {
    layout = 'Empty', layoutConfig = {},
    props: propsCfg = {},
    actionLayout = 'Row',
    actionLayoutConfig = {},
  } = config;

  const [
    tableProps, tableData, handle, actionsItems,
    {
      operationData,
    }
  ] = useListHandle({
    namespace,
    extraData,
    config,

    forceInitList,
  });

  if (typeof Item !== 'function') {
    console.warn('请在 props 里传入 Item');
    return '未提供有效的 Item';
  }

  const listData = props.data || tableData || [];

  return <Render n={layout} {...layoutConfig}
    handle={handle}
    namespace={namespace}
  >
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actionsItems}
    </Render>
    <Render n="Items" {...layoutConfig}
      handle={handle}
      namespace={namespace}
    >
      {listData.map((item, i) => (
        <Item
          key={item.id}
          {...tableProps}
          {...propsCfg}
          index={i}
          data={item}
          handle={handle}
        />
      ))}
    </Render>
    <br />
    <Pagination
      {...tableProps.pagination}
    />
  </Render>
}