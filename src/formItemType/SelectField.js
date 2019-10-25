import React, { useState } from 'react';
import { Select, Spin } from 'antd';
import { query } from 'zero-element/lib/utils/request';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';

const Option = Select.Option;

/**
 * 专门用来读取 数字字典 的 域 的下拉框
 *
 * @export
 * @param {object} props
 * @returns
 */
export default function SelectField(props) {
  const {
    className,
    value,
    options,
    namespace,
    onChange,
    ...rest
  } = props;
  const {
    API = '/api/config/field/options',
    field,
    dataField = 'records',
    label: optLabel = 'name', value: optValue = 'value',
  } = options;
  const [loading, setLoading] = useState(false);
  const [optionList, setOptionList] = useState([]);

  useDidMount(getData);

  function getData() {
    if (API && field) {
      setLoading(true);
      query(`${API}/${field}`).then(({ data: { code, data } }) => {
        if (code === 200) {
          const list = Array.isArray(data) ?
            data
            : data[dataField];

          if (Array.isArray(list)) {
            setOptionList(list);
          } else {
            console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
          }
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
    });
  }

  return <Spin className={className} spinning={loading}>
    <Select onChange={handleChange} value={value} {...rest}>
      {optionList.map(opt => (
        <Option key={opt[optValue]} value={opt[optValue]}>{opt[optLabel]}</Option>
      ))}
    </Select>
  </Spin>
}