import React, { useState, useEffect, useRef } from 'react';
import { query } from 'zero-element/lib/utils/request';
import { Select } from 'antd';
import qs from 'qs';

const { Option } = Select;

function getSearch(location) {
  if (location.search) {
    return location.search.replace('?', '');
  } else {
    return location.hash.split('?')[1] || '';
  }
}

export default function SelectTableField(props) {
  const { field, label, value, handle, config, options } = props;
  const { sql, tableName } = config;
  const { table } = options;
  const { onAdvancedChange, onSave } = handle;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const prevSqlValue = useRef(sql.value);
  const tableFields = useRef([]);

  useEffect(_ => {
    setData([]);
    if (prevSqlValue.current !== sql.value) {
      prevSqlValue.current = sql.value;
      clearValue();
    }
    if (sql.value && tableName.value) {
      queryTableData(sql.value, tableName.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sql.value, tableName.value]);

  function clearValue() {
    onAdvancedChange(field, '');
  }
  function queryTableData(sql, tableName) {
    setLoading(true);
    const { location = {} } = window;
    const qsObj = qs.parse(getSearch(location));

    const fAPI = `/api/generate/sql/${qsObj.uuid}/${sql}/table/${tableName}`;

    query(fAPI).then((response) => {
      const { status, data } = response;
      if (status === 200 && data.code === 200) {
          setData(data.data.map(field => {
            return {
              id: field.field,
              title: field.comment || field.field,
              value: field.field,
            }
          }));
      }
    }).finally(_ => {
      setLoading(false);
    });
  }
  function handleChange(value) {
    if (value) {
      const find = data.find(item => item.value === value);
      tableFields.current = find.children;
      handleSetDefaultTableFields();
    }
    onAdvancedChange(field, value);
  }
  function handleSetDefaultTableFields() {
    if (table.length === 0) {
      table.push(...tableFields.current.map(field => ({
        label: field.comment || field.field,
        value: field.field,
      })));
      onSave();
    }
  }

  return <>
    <div>{label}</div>
    <Select
      style={{ minWidth: 120 }}
      value={value}
      onChange={handleChange}
      loading={loading}
      allowClear
    >
      {data.map(item => {
        return <Option key={item.id} value={item.value}>{item.title}</Option>;
      })}
    </Select>
  </>
}