import React, { useState, useEffect, useRef } from 'react';
import { Select, Spin } from 'antd';
import { query } from '@/../zero-antd-dep/utils/request';
import { formatAPI } from 'zero-element/lib/utils/format';
import { useWillMount } from 'zero-element/lib/utils/hooks/lifeCycle';

const Option = Select.Option;

export default function SelectFetch(props) {
  const {
    name,
    className,
    value,
    options,
    namespace,
    onChange,
    handle = {},
    formdata = {},
    hooks = {},
    props: pProps,
    ...rest
  } = props;
  const {
    API, dataField = 'records',
    label: optLabel = 'label', value: optValue = 'value',
    dataChildField,
    saveData,
    effectField,
    childField,
    groupField
  } = options;
  const { onFormFieldMap } = hooks;
  const { onSaveOtherValue } = handle;
  const [loading, setLoading] = useState(false);
  const [optionList, setOptionList] = useState([]);
  // 默认值
  const [defaultValue,setDefaultValue] = useState()
  const [isFindObj,setIsFindObj] = useState()
  const initRef = useRef(false);
  const effectFieldValue = formdata[effectField];
  const groupFieldValue = formdata[groupField]
  
  useWillMount(_ => {
    if (effectField === undefined&&groupField === undefined) {
      getData();
    }
  });
  useEffect(_ => {
    if (effectFieldValue) {
      if (initRef.current) {
        handleChange();
      }
      getData();
    }
  }, [effectFieldValue]);
  useEffect(_=>{
    if(groupFieldValue){
      handleChange(groupFieldValue[optValue])
    }
    getData()
  },[groupFieldValue])
  useEffect(_ => {
    if(typeof groupFieldValue === 'object'&&!childField){
      console.error("SelectFetch组件提示","使用字段值为Object需要在options中添加childField属性")
      setDefaultValue(value)
    }else if(typeof groupFieldValue === 'string'){
      setDefaultValue(groupFieldValue)
    }else if(typeof groupFieldValue ==='object' &&childField){
      setDefaultValue(groupFieldValue[childField])
    }else{
      setDefaultValue(value)
    }
    // handleChange(value);
    if(optionList.length>0){
      let find = optionList.find(i=>i[optValue] == defaultValue)
      setIsFindObj(find)
      if(find){
        handleChange(defaultValue)
      }else if(value){
        handleChange(value)
      }
    }
  }, [optionList])

  function getData() {
    if (API) {
      const fAPI = formatAPI(API, {
        namespace,
        data: formdata,
      });
      setLoading(true);
      query(fAPI)
        .then(data => {
          const list = Array.isArray(data) ?
            data
            : data[dataField];

          if (Array.isArray(list)) {
            if(dataChildField){
              const nList = [];
              list.map(item =>{
                nList.push(item[dataChildField])
              })
              setOptionList(nList);
            }else{
              setOptionList(list);
            }
          } else {
            console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
          }
        })
        .finally(_ => {
          setLoading(false);
          initRef.current = true;
        })
    }
  }
  function handleChange(val) {
    console.log(val)
    let newValue = value
    let findGroup = optionList.find(i=>i[optValue] == val)
    if(findGroup){
      setDefaultValue(findGroup[optLabel])
    }

    // if(childField){
    //   newValue[childField] = val
    // }else{
      newValue = val
    // }
    onChange({
      target: {
        value:newValue
      }
    });

    const find = optionList.find(i => i[optValue] === value);

    if (saveData) {
      if (find) {
        Object.keys(saveData).forEach(key => {
          onSaveOtherValue(key, find[saveData[key]]);
        });
      } else {
        console.log(`未能找到 ${optValue} 为 ${value} 的数据, saveData 选项无法生效`);
      }
    }
    if (typeof onFormFieldMap === 'function') {
      onFormFieldMap(name, find)
        .then(data => {
          const rst = {};
          Object.keys(data).forEach(key => {
            rst[key] = data[key];
          });
          onSaveOtherValue(rst);
        })
    }
  }

  return <Spin className={className} spinning={loading}>
    <Select onChange={handleChange} value={defaultValue} {...pProps}>
      {optionList.map((opt,o) => (
        <Option key={opt[optValue]+o} value={opt[optValue]}>
          {opt[optLabel]}
        </Option>
      ))}
    </Select>
  </Spin>
}