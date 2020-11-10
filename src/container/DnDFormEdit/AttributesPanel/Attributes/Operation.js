import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toNumber, arrayItemMove } from '@/utils/tool';
import ActionEdit from '../components/ActionEdit';

export default function ({ data, onSave }) {

  function renderItemsOptions(data, handle, otherProps = {}) {
    return <ActionEdit
      items={data}
      {...handle}
      {...otherProps}
    />
  }

  function handleItemChange(i, type, e) {
    data[i][type] = toNumber(e.target.value);
    onSave();
  }

  function handleItemAdd() {
    data.push({
      title: `操作${data.length + 1}`,
      type: 'path',
      options: {
        outside: false,
      },
    });
    onSave();
  }

  function handleItemDel(i) {
    data.splice(i, 1);
    onSave();
  }

  function handleItemIndexChange(type, index) {
    arrayItemMove(data, type, index);
    onSave();
  }

  return data ? (<>
    <div className="ZEleA-DnDFormEdit-title">数据操作</div>
    <Button type="dashed" icon={<PlusOutlined />}
      onClick={handleItemAdd}>
      添加操作
      </Button>
    <br /><br />
    {renderItemsOptions(data, {
      onChange: handleItemChange,
      onRemove: handleItemDel,
      onIndexChange: handleItemIndexChange,
    })}
  </>) : null
}