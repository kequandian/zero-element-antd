import React, { useMemo, useState, useEffect } from 'react';
import { Checkbox, Button, Input } from 'antd';
import '../index.css';
import { toNumber } from '@/utils/tool';
import { Flex } from '@/layout/Flex';

const CheckboxGroup = Checkbox.Group;
const { FlexItem } = Flex;
const { Search } = Input;

export default function PCDMContainer({
  title, operationName,
  keepSelected,
  listData,
  optLabel, optValue,
  onClick,
  onSelect,
}) {
  const [selectedList, setSelectedList] = useState([]);
  const [searchStr, setSearchStr] = useState('');

  const optionsOrigin = useMemo(_ => {
    if (!Array.isArray(listData)) return [];
    return listData.map(i => ({
      label: i[optLabel],
      value: i[optValue],
    }))
  }, [listData, optLabel, optValue]);

  const options = useMemo(_ => {
    if (searchStr === '') {
      return optionsOrigin;
    }
    return optionsOrigin.filter(item => {
      return item.label.indexOf(searchStr) > -1;
    })
  }, [searchStr, optionsOrigin]);

  useEffect(_ => {
    if (!keepSelected) {
      setSelectedList([]);
    }
  }, [keepSelected, listData]);

  function handleChange(data) {
    setSelectedList(data);
  }
  function handleSelected() {
    onSelect(
      listData.filter(item =>
        selectedList.includes(item.id)
      )
    );
    if (keepSelected) {
      setSelectedList([]);
    }
  }
  function handleAllSelected(e) {
    const checked = e.target.checked;

    if (checked) {
      setSelectedList(optionsOrigin.map(i => i.value));
    } else {
      setSelectedList([]);
    }
  }
  function handleClick(e) {
    const id = e.target.value;
    if (id) {
      const nId = toNumber(id);
      const data = listData.find(i => i.id === nId);
      onClick && onClick(data.id);
    }
  }
  function handleLocalSearch(value) {
    setSearchStr(value);
  }

  const selectedCount = selectedList.length;
  const listCount = (listData && listData.length) || 0;

  return <div className="ZEleA-PCDM-container">
    <div className="ZEleA-PCDM-title">
      <Checkbox
        indeterminate={0 < selectedCount && selectedCount < listCount}
        checked={selectedCount && selectedCount === listCount}
        onChange={handleAllSelected}
      />
      <div className="title">
        <Flex>
          <FlexItem flex={1}>
            {title}
          </FlexItem>
          <FlexItem className="search">
            <Search
              allowClear
              placeholder="搜索..."
              onSearch={handleLocalSearch}
            />
          </FlexItem>
        </Flex>
      </div>
      <span>{selectedCount}/{listCount}</span>
    </div>
    <div className="ZEleA-PCDM-body">
      <CheckboxGroup
        onClick={handleClick}
        onChange={handleChange}
        options={options}
        value={selectedList}
      />
    </div>
    <div className="ZEleA-PCDM-footer">
      <Button
        type="link"
        disabled={!selectedList.length}
        onClick={handleSelected}
      >
        {operationName}
      </Button>
    </div>
  </div>
}