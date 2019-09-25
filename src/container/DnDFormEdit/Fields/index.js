import React, { useState, useRef } from 'react';
import { Button, Input } from 'antd';
import { Flex } from 'layout-flex';

const { FlexItem } = Flex;

export default function ({ data, dispatch }) {
  const [editField, setEditField] = useState(null);
  const editValue = useRef('');

  function handleAppend() {
    dispatch({
      type: 'appendField',
    });
  }
  function handleEdit(field) {
    setEditField(field);
    editValue.current = field;
  }
  function handleCancelEdit() {
    setEditField(null);
  }
  function handleValueChange(e) {
    editValue.current = e.target.value;
  }
  function handleSave() {
    dispatch({
      type: 'changeField',
      payload: {
        field: editField,
        value: editValue.current,
      }
    });
    handleCancelEdit();
  }
  function handleRemove() {
    dispatch({
      type: 'removeField',
      payload: {
        field: editField,
      }
    });
    handleCancelEdit();
  }

  return <div>
    {editField ? (
      <Flex>
        <FlexItem flex={1}>
          <Input autoFocus
            defaultValue={editField}
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
      const isThisEdit = field === editField;
      const disabled = editField && !isThisEdit;

      return <Button key={i} size="small" className="ZEleA-margin-left"
        disabled={disabled}
        onClick={handleEdit.bind(null, field)}
      >
        {field}
      </Button>;
    })}

    <Button type="dashed" className="ZEleA-margin-left" size="small"
      icon="plus"
      disabled={editField}
      onClick={handleAppend}
    ></Button>
  </div>
}