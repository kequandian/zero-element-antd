import React, { useState } from 'react';
import { Checkbox, Spin } from 'antd';
import { query } from '@/utils/request';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';

export default function CheckboxFetch({
  className,
  props, defaultValue, value,
  options, namespace,
  ...rest
}) {
  const { API, dataField = 'records',
    label: optLabel = 'label', value: optValue = 'value'
  } = options;
  const [loading, setLoading] = useState(false);
  const [optionList, setOptionList] = useState([]);

  useDidMount(getData);

  function getData() {
    if (API) {
      const fAPI = formatAPI(API, {
        namespace,
      });
      setLoading(true);
      query(fAPI)
        .then(data => {
          const list = Array.isArray(data) ?
            data
            : data[dataField];

          if (Array.isArray(list)) {
            setOptionList(list.map(item => ({
              label: item[optLabel],
              value: item[optValue],
            })));
          } else {
            console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
          }
        })
        .finally(_ => {
          setLoading(false);
        })
    }
  }

  return <Spin className={className} spinning={loading}>
    <Checkbox.Group
      defaultValue={typeof defaultValue === 'string' ? [] : defaultValue}
      value={typeof value === 'string' ? [] : value}
      options={optionList}
      {...rest}
      {...props}
    />
  </Spin>
}