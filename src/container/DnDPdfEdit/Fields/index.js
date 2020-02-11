import React, { useState, useRef, useEffect } from 'react';
import { Button, Input } from 'antd';
import { Flex } from 'layout-flex';

const { FlexItem } = Flex;

export default function ({ data, dispatch }) {
  const [editField, setEditField] = useState(null);
  const [inputData, setInputData] = useState('');
  const editValue = useRef([]);

  useEffect(_ => {
    if (editField === null) {
      editValue.current = JSON.parse(JSON.stringify(data));
    }
  }, [data, editField]);

  function handleAppend() {
    dispatch({
      type: 'appendField',
    });
  }
  function handleEdit(field) {
    setEditField(field);
    setInputData(editValue.current[field]);
  }
  function handleCancelEdit() {
    setEditField(null);
  }
  function handleValueChange(e) {
    const value = e.target.value;
    editValue.current[editField] = value;
    setInputData(value);
  }
  function handleSave() {
    dispatch({
      type: 'saveFields',
      payload: editValue.current,
    });
    handleCancelEdit();
  }
  function handleRemove() {
    dispatch({
      type: 'removeFieldIndex',
      payload: {
        index: editField,
      }
    });
    handleCancelEdit();
  }

  return <div>
    {editField !== null ? (
      <Flex>
        <FlexItem flex={1}>
          <Input autoFocus
            value={inputData}
            onChange={handleValueChange}
          />
        </FlexItem>
        <FlexItem>
          <Button className="ZEleA-margin-left" type="primary"
            onClick={handleSave}
          >
            保存
          </Button>
          <Button className="ZEleA-margin-left" type="danger"
            onClick={handleRemove}
          >
            删除
          </Button>
          <Button className="ZEleA-margin-left" onClick={handleCancelEdit}>
            取消
          </Button>
        </FlexItem>
        <br /><br />
      </Flex>
    ) : null}

    {data.map((field, i) => {
      return <Button key={i} size="small" className="ZEleA-margin-left"
        onClick={handleEdit.bind(null, i)}
      >
        {field}
      </Button>;
    })}

    <Button type="dashed" className="ZEleA-margin-left" size="small"
      icon="plus"
      onClick={handleAppend}
    ></Button>
  </div>
}