import React from 'react';
import Flex from '@/layout/Flex';
import { Checkbox } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, SettingOutlined } from '@ant-design/icons';
import '../../index.css';

const { FlexItem } = Flex;

export default ({
  data,
  onSwitchChecked, onMoveField,
  onOpenModal,
}) => {
  const checked = data._checked === false ? false : true;

  function onUp() {
    onMoveField('up', data);
  }
  function onDown() {
    onMoveField('down', data);
  }
  function onModal() {
    onOpenModal({
      ...data,
      id: data._id,
    });
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
      <SettingOutlined className="ZEleA-ListFieldsEdit-FieldItem-icon"
        onClick={onModal}
      />
    </FlexItem>
  </Flex>
}