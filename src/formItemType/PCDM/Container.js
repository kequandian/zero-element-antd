import React, { useMemo, useState, useEffect } from 'react';
import { Checkbox, Button } from 'antd';
import '../index.css';

const CheckboxGroup = Checkbox.Group;

export default function PCDMContainer({
  title, operationName,
  keepSelected,
  listData,
  optLabel, optValue,
  onClick,
  onSelect,
}) {
  const [selectedList, setSelectedList] = useState([]);

  const options = useMemo(_ => {
    if (!Array.isArray(listData)) return [];
    return listData.map(i => ({
      label: i[optLabel],
      value: i[optValue],
    }))
  }, [listData, optLabel, optValue]);

  useEffect(_ => {
    if (!keepSelected) {
      setSelectedList([]);
    }
  }, [keepSelected, listData]);

  function handleChange(data) {
    onClick && onClick(data);
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

  const selectedCount = selectedList.length;
  const listCount = (listData && listData.length) || 0;

  return <div className="ZEleA-PCDM-container">
    <div className="ZEleA-PCDM-title">
      <Checkbox
        indeterminate={0 < selectedCount && selectedCount < listCount}
        checked={selectedCount && selectedCount === listCount}
      />
      <div className="title">
        {title}
      </div>
      <span>{selectedCount}/{listCount}</span>
    </div>
    <div className="ZEleA-PCDM-body">
      <CheckboxGroup
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