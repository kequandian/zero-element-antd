import React, { useRef } from 'react';
import ItemEdit from '../../ItemEdit';
import { arrayItemMove } from '@/utils/tool';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function TableField(props) {
  const { field, label, value, handle } = props;
  const countId = useRef(0);

  function handleAppend() {
    countId.current = countId.current + 1;

    value.push({
      label: '新字段',
      field: countId.current,
    });

    saveData();
  }
  function onChange(index, type, e) {
    const v = e.target.value;
    value[index][type] = v;

    saveData();
  }
  function handleItemIndexChange(type, index) {
    arrayItemMove(value, type, index);

    saveData();
  }
  function onRemove(index) {
    value.splice(index, 1);

    saveData();
  }
  function saveData() {
    handle(field, {
      target: {
        value,
      }
    });
  }

  return <>
    <div>{label}</div>
    <Button icon={<PlusOutlined />} onClick={handleAppend}>添加子项</Button>
    <br /><br />
    <ItemEdit
      items={value}
      valueField="field"
      onChange={onChange}
      onRemove={onRemove}
      onIndexChange={handleItemIndexChange}
    />
  </>
}