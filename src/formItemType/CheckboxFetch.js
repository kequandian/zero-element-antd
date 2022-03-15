import React, { useState } from 'react';
import { Checkbox, Spin } from 'antd';
import { query } from '@/utils/request';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';

/**
 * 
 * @param {formatField} formatField 自定义 提交的json字段
 * 比如 formatField = "id"，即提交的参数为 [{"id": 1}]。
 * formatField 为空, 即提交的 ["1", "2"] 
 */

export default function CheckboxFetch({
  className,
  props, defaultValue, value,
  options, namespace,
  ...rest
}) {
  
  const { API, dataField = 'records',
    label: optLabel = 'label', value: optValue = 'value', formatField
  } = options;
  const [loading, setLoading] = useState(false);
  const [optionList, setOptionList] = useState([]);
  
  const { onChange, formdata } = rest;

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

  function handleChange(data){
    if(formatField){
      const nData = [];
      data.map(item => {
        const i = {};
        i[formatField] = item;
        nData.push(i)
      })
      onChange(nData)
    }else{
      onChange(data)
    }
    
  }

  function formatData(data){
    const d = [];
    if(data && Array.isArray(data) && data.length > 0){
      if(data[0] && data[0][formatField]){
        data.map(item => {
          d.push(item[formatField])
        })
        return d;
      }else{
        console.error('checkbox 数据异常, 数据格式为[{"id": "1"}]]')
      }
    }
  }

  return <Spin className={className} spinning={loading}>
    <Checkbox.Group
      defaultValue={typeof defaultValue === 'string' ? [] : formatField ? formatData(defaultValue) : defaultValue}
      value={typeof value === 'string' ? [] : formatField ? formatData(value) : value}
      options={optionList}
      {...rest}
      {...props}
      onChange={handleChange}
    />
  </Spin>
}