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
import EditJson from '@/container/DnDFormEdit/AttributesPanel/components/ItemEdit/EditJson';
import '@/container/DnDFormEdit/AttributesPanel/components/ItemEdit/index.css';

const { FlexItem } = Flex;

export default function ItemEdit(props) {
  const {
    title, index, type, options,
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
      {title}
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
    <span>按钮文本: </span>
    <Input value={title} onChange={onChange.bind(null, index, 'title')} />
    {type !== undefined ? (
      <>
        <span>渲染类型: </span>
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
  </Card>
}