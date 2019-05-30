import React from 'react';
import { Flex } from 'zero-layout';
import { Checkbox, Icon } from 'antd';
import '../index.css';

const { FlexItem } = Flex;

export default ({ data, checkedList, onSwitchChecked }) => {
  const checked = checkedList.findIndex(key => key === data.field) > -1;
  return <Flex className="ZEle-ListFieldsEdit-FieldItem">
    <FlexItem>
      <Checkbox checked={checked} onChange={onSwitchChecked.bind(this, data)} />
    </FlexItem>
    <FlexItem flex={1}>
      <span className="ZEle-ListFieldsEdit-FieldItem-label" onClick={onSwitchChecked.bind(this, data)}>{data.label}</span>
    </FlexItem>
    <FlexItem>
      <Icon type="arrow-up" className="ZEle-ListFieldsEdit-FieldItem-icon" />
      <Icon type="arrow-down" className="ZEle-ListFieldsEdit-FieldItem-icon" />
    </FlexItem>
  </Flex>
}