import React from 'react';
import { Button, Menu, Pagination } from 'antd';
import NavMenuItem from './NavMenuItem';
import { PlusOutlined } from '@ant-design/icons';

const { Item } = Menu;

export default function NavMenu({
  selectId, data,
  onClick,
  onCreate, onEdit, onRemote,
  pagination, onPagination,
}) {
  if (!data.length) return null;

  function handleClick({ key }) {
    const find = data.find(i => String(i.id) === key);

    onClick(find);
  }
  function handleCreate() {
    onCreate();
  }

  return <>
    {onCreate ? (
      <Button
        icon={<PlusOutlined />}
        type="dashed"
        block
        onClick={handleCreate}
      >
        新增
    </Button>
    ) : null}
    <Menu
      mode="inline"
      onClick={handleClick}
      selectedKeys={[selectId]}
      style={{
        width: 186,
      }}
    >
      {data.map(item => {
        return <Item key={item.id}>
          <NavMenuItem
            data={item}
            onEdit={onEdit}
            onRemote={onRemote}
          />
        </Item>
      })}
    </Menu>
    {pagination && onPagination ? (
      <Pagination
        simple
        {...pagination}
        onChange={onPagination}
      />
    ) : null}
  </>
}