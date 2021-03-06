import React from 'react';
import { Render } from 'zero-element/lib/config/layout';
import useListHandle from './utils/useListHandle';
import { Pagination, Empty } from 'antd';

export default function ItemList(props) {
  const {
    namespace, config, extraData,
    Item,
    ...restProps
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

    props,
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
          namespace={namespace}
          {...tableProps}
          {...propsCfg}
          {...restProps}
          index={i}
          data={item}
          handle={handle}
        />
      ))}
    </Render>
    {listData.length ? null : <Empty />}
    {tableProps.pagination ? (
      <>
        <br />
        <Pagination
          {...tableProps.pagination}
        />
      </>
    ) : null}
  </Render>
}