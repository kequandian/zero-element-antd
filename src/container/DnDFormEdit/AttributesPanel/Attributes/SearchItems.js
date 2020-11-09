import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toNumber, arrayItemMove } from '@/utils/tool';
import ItemEdit from '../components/ItemEdit';

export default function ({ data, onSave }) {

  function renderItemsOptions(data, handle, otherProps = {}) {
    return <ItemEdit
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
      label: `字段${data.length + 1}`,
      value: data.length + 1,
      type: 'input',
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
    <div className="ZEleA-DnDFormEdit-title">搜索字段</div>
    <Button type="dashed" icon={<PlusOutlined />}
      onClick={handleItemAdd}>
      添加字段
      </Button>
    <br /><br />
    {renderItemsOptions(data, {
      onChange: handleItemChange,
      onRemove: handleItemDel,
      onIndexChange: handleItemIndexChange,
    })}
  </>) : null
}