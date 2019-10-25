import React, { useState, useEffect, useRef } from 'react';
import { query } from '@/utils/request';
import { Select } from 'antd';
import window from 'zero-element/lib/utils/window';
import qs from 'qs';

const { Option } = Select;

function getSearch(location) {
  if (location.search) {
    return location.search.replace('?', '');
  } else {
    return location.hash.split('?')[1] || '';
  }
}

export default function SelectTable(props) {
  const { field, label, value, handle, config, options } = props;
  const { sql } = config;
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
    if (sql.value) {
      queryTableData(sql.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sql.value]);

  function clearValue() {
    onAdvancedChange(field, '');
  }
  function queryTableData() {
    setLoading(true);
    const { location = {} } = window;
    const qsObj = qs.parse(getSearch(location));

    const fAPI = `/api/generate/sql/${qsObj.uuid}/${sql.value}`;
    query(fAPI)
      .then((data) => {
        setData(data.items.map(table => {
          return {
            id: table.id,
            title: table.tableName,
            value: table.tableName,
            children: table.children,
          }
        }));
      })
      .finally(_ => {
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
        options: {
          type: 'plain',
          echoAdd: true,
          echoEdit: true,
        }
      })));
      onSave();
    }
  }

  return <>
    <div>{label}</div>
    <Select
      style={{ width: 190 }}
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