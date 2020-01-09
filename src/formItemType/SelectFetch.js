import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import { query } from '@/utils/request';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useWillMount } from 'zero-element/lib/utils/hooks/lifeCycle';

const Option = Select.Option;

export default function SelectFetch(props) {
  const {
    className,
    value,
    options,
    namespace,
    onChange,
    handle,
    ...rest
  } = props;
  const {
    API, dataField = 'records',
    label: optLabel = 'label', value: optValue = 'value',
    effectField,
  } = options;
  const { onGetFormData } = handle;
  const [loading, setLoading] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const formData = onGetFormData();
  const effectFieldValue = formData[effectField];

  useWillMount(_ => {
    if (effectField === undefined) {
      getData();
    }
  });
  useEffect(_ => {
    if (effectFieldValue) {
      getData();
      handleChange();
    }
  }, [effectFieldValue]);

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
            setOptionList(list);
          } else {
            console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
          }
        })
        .finally(_ => {
          setLoading(false);
        })
    }
  }
  function handleChange(value) {
    onChange({
      target: {
        value,
      }
    });
  }

  return <Spin className={className} spinning={loading}>
    <Select onChange={handleChange} value={value} {...rest}>
      {optionList.map(opt => (
        <Option key={opt[optValue]} value={opt[optValue]}>
          {opt[optLabel]}
        </Option>
      ))}
    </Select>
  </Spin>
}