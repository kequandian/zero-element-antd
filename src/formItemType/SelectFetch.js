import React, { useState } from 'react';
import { Select, Spin } from 'antd';
import { query } from 'zero-element/lib/utils/request';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';

const Option = Select.Option;

export default function SelectFetch(props) {
  const { className, value, onChange, options, namespace } = props;
  const { API } = options;
  const [loading, setLoading] = useState(false);
  const [optionList, setOptionList] = useState([]);

  useDidMount(getData);

  function getData() {
    if (API) {
      const fAPI = formatAPI(API, {
        namespace,
      });
      setLoading(true);
      query(fAPI).then(({ data }) => {
        const list = data.data;
        if (Array.isArray(list)) {
          setOptionList(list);
        } else {
          console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
        }
      }).finally(_ => {
        setLoading(false);
      })
    }
  }
  function handleChange(value) {
    onChange({
      target: {
        value,
      }
    })
  }

  return <div className={className}>
    <Spin spinning={loading}>
      <Select onChange={handleChange} value={value}>
        {optionList.map(opt => (
          <Option key={opt.value} value={opt.value}>{opt.title}</Option>
        ))}
      </Select>
    </Spin>
  </div>
}