import React, { useState, useEffect, useRef } from 'react';
import { Tag, Button, Select, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { query } from '@/utils/request';

export default function Tags({ name, value, props, onChange, options, handle, ...rest }) {
  const {
    API = '/api/stock/tags',
    dataField = 'records',
    label: optLabel = 'tagName', value: optValue = 'id'
  } = options;
  const { onFormatValue } = handle;
  const [tagList, setTagList] = useState([]);
  const [createIng, setCreateIng] = useState(false);
  const lastFetchId = useRef(0);
  const [loading, setLoading] = useState(false);
  const [optionsList, setOptionsList] = useState([]);

  useEffect(_ => {
    if (Array.isArray(value)) {
      setTagList(value);
    } else if (typeof value === 'string' && value.indexOf('[') > -1) {
      onFormatValue(name, 'JSONString');
      setTagList(JSON.parse(value));
    }
  }, [value])

  function handleRemoveString(removedTag) {
    onChange(tagList.filter(tag => tag !== removedTag));
  }

  function handleRemove(data) {
    onChange(tagList.filter(tag => tag[optValue] !== data[optValue]));
  }

  function handleClick() {
    setCreateIng(true);
  }

  function handleCreate() {
    setCreateIng(false);
  }

  function handleQuery(v) {
    lastFetchId.current += 1;
    const fetchId = lastFetchId.current;

    setLoading(true);
    query(API, {
      [optLabel]: v,
    })
      .then(data => {
        if (fetchId === lastFetchId.current) {
          const list = Array.isArray(data) ?
            data
            : data[dataField];

          if (Array.isArray(list)) {
            setOptionsList(list);
          } else {
            console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
          }
        }
      })
      .finally(_ => setLoading(false))
  }

  function handleSelect(id) {
    if (tagList.every(tag => tag[optValue] !== id)) {
      const find = optionsList.find(opt => opt[optValue] === id);
      if (find) {
        tagList.push(find);
      }
      setTagList([...tagList]);
    }
  }

  return <>
    {tagList.map(tag => {
      if (typeof tag === 'string') {
        return <Tag
          key={tag}
          closable
          {...rest}
          {...props}
          onClose={handleRemoveString}
        >
          {tag}
        </Tag>
      }
      return <Tag
        key={tag[optValue]}
        closable
        {...rest}
        {...props}
        onClose={() => handleRemove(tag)}
      >
        {tag[optLabel]}
      </Tag>
    })}
    {createIng ?
      <>
        <br /><br />
        <Select
          showSearch
          size="small"
          notFoundContent={loading ? <Spin size="small" /> : null}
          onSearch={handleQuery}
          onChange={handleSelect}
          onBlur={handleCreate}
        >
          {optionsList.map(
            opt => (<Select.Option key={opt[optValue]}>{opt[optLabel]}</Select.Option>)
          )}
        </Select>
      </>
      : <Button
        type="dashed"
        size="small"
        icon={<PlusOutlined />}
        onClick={handleClick}
      />
    }

  </>
}