import React, { useRef, useMemo, useEffect, useReducer } from 'react';
import { formatTableFields } from '@/container/List/utils/format';
import { getActionItem } from '@/utils/readConfig';
import { Render } from 'zero-element/lib/config/layout';
import { useWillMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import TableSelect from '@/formItemType/TableSelect';

export default function OneMary(props) {
  const {
    name, namespace, value, options = {},
    handle,
    onChange,
    hooks = {},
    model,
    formdata,
  } = props;
  const {
    API,
    layout = 'Empty',
    fields, operation, actions = [],
    props: propsCfg = {}, layoutConfig = {},
    actionLayout = 'Row',
    actionLayoutConfig = {},
    JSONString,
    map,

    value: optValue,
    pagination = false,
    rowSelection = false,
    searchFields = false,
    type = 'checkbox',

    effectField,
  } = options;
  const { onFormatValue } = handle;
  const { removeChildAfter } = hooks;
  const effectFieldValue = formdata[effectField];
  const [count, forcedUpdate] = useReducer(x => x + 1, 0);

  const idRef = useRef(1);
  const v = useMemo(_ => {
    if (JSONString && typeof value === 'string' && value.length) {
      return JSON.parse(value);
    }
    return value;
  }, [value])

  useWillMount(_ => {
    if (map) {
      onFormatValue(name, 'map', map);
    }
    if (JSONString) {
      onFormatValue(name, 'JSONString');
    }
  });

  useEffect(_ => {
    if (effectField) {
      forcedUpdate();
      handleChange();
    }
  }, [effectFieldValue]);

  function handleChangeTableData(data) {
    onChange(data);
  }

  function handleChange(selectedRows, selectedRowKeys) {
    onChange(selectedRows);
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
    if (v) {
      v[index] = data;
      onChange([...v]);
    }
  }
  function handleRemove({ record, options = {} }) {

    const temp = v.filter(item => {
      if (item._id !== undefined) {
        return item._id !== record._id;
      }
      return item.id !== record.id;
    });

    onChange([...temp]);

    if (typeof removeChildAfter === 'function') {
      removeChildAfter(record, props);
    }
  }

  const { columns } = formatTableFields(fields, operation, {
    onRemoveChild: handleRemove,
    onEdit: handleEdit,
  }, {
    namespace,
    model,
  });

  return <Render n={layout} {...layoutConfig}>
    <Render n={actionLayout} {...actionLayoutConfig}>
      {actions.map((action, i) => getActionItem({
        key: i,
        ...action,
        value: v,
      }, {}, {
        onCreate: handleCreate,
        onCreateList: handleCreateList,
        onEdit: handleEdit,
      }, {
        namespace,
      }))}
    </Render>
    <TableSelect
      value={optValue}
      onChange={handleChange}
      onChangeTableData={API ? handleChangeTableData : undefined}
      namespace={namespace}
      extraData={formdata}
      forceInitList={count}
      data={API ? undefined : v}
      columns={columns}
      options={{
        API,
        fields,
        type,
        pagination: pagination,
        rowSelection: rowSelection,
        searchFields,
        value: optValue,
        rowKey: row => String(row._id || row.id || row[optValue])
      }}
    />
  </Render>
}