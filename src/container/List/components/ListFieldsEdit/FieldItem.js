import React from 'react';
import { Flex } from 'layout-flex';
import { Checkbox, Icon } from 'antd';
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
      <Icon type="arrow-up" className="ZEleA-ListFieldsEdit-FieldItem-icon"
        onClick={onUp}
      />
      <Icon type="arrow-down" className="ZEleA-ListFieldsEdit-FieldItem-icon"
        onClick={onDown}
      />
    </FlexItem>
  </Flex>
}