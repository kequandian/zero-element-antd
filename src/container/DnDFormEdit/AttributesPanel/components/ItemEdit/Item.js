import React from 'react';
import { Card, Input } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DeleteOutlined,
  UpOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Flex } from 'layout-flex';
import Options from './Options';
import EditJson from './EditJson';
import './index.css';

const { FlexItem } = Flex;

export default function ItemEdit(props) {
  const {
    label, index, type, valueType, options,
    valueField = 'value',
    disabled, // 禁用 options 的编辑,
    text: {
      label: tLabel = '文本',
      value: tValue = '值',
    },
    editId,
    onClick,
    onChange, onRemove, onOptionsChange,
    onIndexChange,
  } = props;
  const edit = editId === index;

  function handleClick() {
    onClick(index);
  }
  function handleMoveUp() {
    onIndexChange('up', index);
  }
  function handleMoveDown() {
    onIndexChange('down', index);
  }

  return <Card
    size="small"
    className={edit ? 'ZEleA-DnDFormEdit-ItemEdit-editing' : undefined}
    title={<div className="ZEleA-DnDFormEdit-ItemEdit-title"
      onClick={handleClick}>
      {label}
    </div>}
    extra={<div>
      <ArrowUpOutlined
        className="ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit"
        onClick={handleMoveUp}
      />
      <ArrowDownOutlined
        className="ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit"
        onClick={handleMoveDown}
      />
      <DeleteOutlined
        className="ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-delete"
        onClick={onRemove.bind(null, index)}
      />
      {edit ?
        <UpOutlined
          className="ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit"
          onClick={handleClick}
        />
        : <DownOutlined
          className="ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit"
          onClick={handleClick}
        />}
    </div>}
    bodyStyle={{
      display: edit ? 'block' : 'none',
    }}
  >
    <span>{tLabel}: </span>
    <Input value={label} onChange={onChange.bind(null, index, 'label')} />
    <span>{tValue}: </span>
    <Input
      value={props[valueField]}
      onChange={onChange.bind(null, index, valueField)}
    />
    {type !== undefined ? (
      <>
        <span>字段类型: </span>
        <Flex>
          <FlexItem flex={1}>
            <Input value={type} onChange={onChange.bind(null, index, 'type')} />
          </FlexItem>
          <FlexItem>
            <EditJson value={options} onChange={onChange.bind(null, index, 'options')} />
          </FlexItem>
        </Flex>
      </>
    ) : null}
    {valueType !== undefined ? (
      <>
        <span>渲染类型: </span>
        <Flex>
          <FlexItem flex={1}>
            <Input value={valueType} onChange={onChange.bind(null, index, 'valueType')} />
          </FlexItem>
          <FlexItem>
            <EditJson value={options} onChange={onChange.bind(null, index, 'options')} />
          </FlexItem>
        </Flex>
      </>
    ) : null}
    <Options
      index={index}
      data={options}
      disabled={disabled}
      onChange={onOptionsChange}
    />
  </Card>
}