import React, { useState } from 'react';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { formatAPI } from 'zero-element/lib/utils/format';
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

export default function SelectSQL(props) {
  const { field, label, value, handle } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useDidMount(queryData);
  function queryData() {
    setLoading(true);
    const { location = {} } = window;
    const qsObj = qs.parse(getSearch(location));

    const fAPI = `/api/generate/sql/${qsObj.uuid}`;
    query(fAPI).then((response) => {
      const { status, data } = response;
      if (status === 200 && data.code === 200) {
        setData(data.data);
      }
    }).finally(_ => {
      setLoading(false);
    });
  }
  return <>
    <div>{label}</div>
    <Select
      style={{ minWidth: 120 }}
      value={value}
      onChange={handle.bind(null, field)}
      loading={loading}
    >
      {data.map(item => {
        return <Option key={item.id} value={item.value}>{item.title}</Option>;
      })}
    </Select>
  </>
}