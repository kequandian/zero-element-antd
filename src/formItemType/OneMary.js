import React, { useRef } from 'react';
import { formatTableFields } from '@/container/List/utils/format';
import { getActionItem } from '@/utils/readConfig';
import { Table } from 'antd';
import { Render } from 'zero-element-global/lib/layout';
import { query } from '@/utils/request';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useWillMount } from 'zero-element/lib/utils/hooks/lifeCycle';

export default function OneMary(props) {
  const { namespace, value, options = {}, onChange } = props;
  const {
    API,
    layout = 'Empty',
    dataField = 'records',
    fields, operation, actions = [],
    props: propsCfg = {}, layoutConfig = {},
    actionLayout = 'Empty',
    actionLayoutConfig = {},
  } = options;
  const idRef = useRef(0);

  useWillMount(_ => {
    if (API) {
      queryData();
    }
  });

  function queryData() {
    const fAPI = formatAPI(API, {
      namespace,
    });
    query(fAPI).then(data => {
      const list = Array.isArray(data) ?
        data
        : data[dataField];

      if (Array.isArray(list)) {
        onChange(list);
      } else {
        console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
      }
    })
  }
  function handleCreate(data) {
    const rst = Array.isArray(value) ? value : [];
    rst.push({
      ...data,
      '_id': idRef.current++,
    })
    onChange([...rst]);
  }
  function handleEdit(index, data) {
    value[index] = data;
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
    onEdit: handleEdit,
  });


  return <Render n={layout} {...layoutConfig}>
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