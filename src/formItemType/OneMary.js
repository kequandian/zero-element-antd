import React, { useRef, useMemo } from 'react';
import { formatTableFields } from '@/container/List/utils/format';
import { getActionItem } from '@/utils/readConfig';
import { Table } from 'antd';
import { Render } from 'zero-element-global/lib/layout';
import { query } from '@/utils/request';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useWillMount } from 'zero-element/lib/utils/hooks/lifeCycle';

export default function OneMary(props) {
  const { name, namespace, value, options = {}, handle, onChange } = props;
  const {
    API,
    layout = 'Empty',
    dataField = 'records',
    fields, operation, actions = [],
    props: propsCfg = {}, layoutConfig = {},
    actionLayout = 'Row',
    actionLayoutConfig = {},
    JSONString,
    map,
  } = options;
  const { onFormatValue, onGetFormData } = handle;
  const idRef = useRef(1);
  const v = useMemo(_ => {
    if (JSONString && typeof value === 'string' && value.length) {
      return JSON.parse(value);
    }
    return value;
  }, [value])

  useWillMount(_ => {
    if (API) {
      queryData();
    }
    if (map) {
      onFormatValue(name, 'map', map);
    }
    if (JSONString) {
      onFormatValue(name, 'JSONString');
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
    const rst = Array.isArray(v) ? v : [];
    rst.push({
      ...data,
      '_id': idRef.current++,
    })
    onChange([...rst]);
  }
  function handleCreateList(data) {
    if (!Array.isArray(data)) return false;

    const rst = Array.isArray(v) ? v : [];
    rst.push(...data.map(item => ({
      ...item,
      '_id': idRef.current++,
    })));
    onChange([...rst]);
  }
  function handleEdit(index, data) {
    v[index] = data;
    onChange([...v]);
  }
  function handleRemove({ record, options = {} }) {

    const temp = v.filter(item => {
      if (item._id !== undefined) {
        return item._id !== record._id;
      }
      return item.id !== record.id;
    });

    onChange([...temp]);
  }

  const { columns } = formatTableFields(fields, operation, {
    onRemoveChild: handleRemove,
    onEdit: handleEdit,
  });


  return <Render n={layout} {...layoutConfig}>
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actions.map((action, i) => getActionItem({
        key: i,
        ...action,
        value: v,
        onCreate: handleCreate,
        onCreateList: handleCreateList,
        onEdit: handleEdit,
        onGetFormData: onGetFormData,
      }, {}, {}, {
        namespace,
      }))}
    </Render>
    <Table
      rowKey={row => String(row._id || row.id)}
      dataSource={v || []}
      columns={columns}
      pagination={false}
      {...propsCfg}
    />
  </Render>
}