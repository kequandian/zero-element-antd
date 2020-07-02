import React from 'react';
import { Flex } from 'layout-flex';
import { Checkbox } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import '../../index.css';

const { FlexItem } = Flex;

export default ({ data, checkedList, onSwitchChecked, onMoveField }) => {
  const checked = checkedList.findIndex(key => key === data.field) > -1;

  function onUp() {
    onMoveField('up', data);
  }
  function onDown() {
    onMoveField('down', data);
  }

  return <Flex className="ZEleA-ListFieldsEdit-FieldItem">
    <FlexItem>
      <Checkbox checked={checked} onChange={onSwitchChecked.bind(this, data)} />
    </FlexItem>
    <FlexItem flex={1}>
      <span className="ZEleA-ListFieldsEdit-FieldItem-label"
        onClick={onSwitchChecked.bind(this, data)}
      >
        {data.label}
      </span>
    </FlexItem>
    <FlexItem>
      <ArrowUpOutlined className="ZEleA-ListFieldsEdit-FieldItem-icon"
        onClick={onUp}
      />
      <ArrowDownOutlined className="ZEleA-ListFieldsEdit-FieldItem-icon"
        onClick={onDown}
      />
    </FlexItem>
  </Flex>
}