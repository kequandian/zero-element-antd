import React, { useRef } from 'react';
import { formatTableFields } from '@/container/List/utils/format';
import { getActionItem } from '@/utils/readConfig';
import { Table } from 'antd';
import { Render } from 'zero-element-global/lib/layout';

export default function ChildrenList(props) {
  const { namespace, value, options = {}, onChange } = props;
  const {
    layout = 'Empty',
    fields, operation, actions = [],
    props: propsCfg = {}, layoutConfig = {},
    actionLayout = 'Empty',
    actionLayoutConfig = {},
  } = options;
  const idRef = useRef(0);

  function handleCreate(data) {
    value.push({
      ...data,
      '_id': idRef.current++,
    })
    onChange([...value]);
  }
  function handleEdit(index, data) {
    itemsData[index] = data;
    onChange([...value]);
  }
  function handleRemove({ record, options = {} }) {

    const temp = value.filter(item => {
      if (item._id !== undefined) {
        return item._id !== record._id;
      }
      return item.id !== record.id;
    });

    onChange([...temp]);
  }

  const columns = formatTableFields(fields, operation, {
    onRemoveChild: handleRemove,
  });


  return <Render n={layout} {...layoutConfig}>
    <br />
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actions.map((action, i) => getActionItem({
        key: i,
        ...action,
        onCreate: handleCreate,
        // onCreateList,
        onEdit: handleEdit,
      }, {}, {}, {
        namespace,
      }))}
    </Render>
    <Table
      rowKey={row => String(row._id || row.id)}
      dataSource={value || []}
      columns={columns}
      pagination={false}
      {...propsCfg}
    />
  </Render>
}