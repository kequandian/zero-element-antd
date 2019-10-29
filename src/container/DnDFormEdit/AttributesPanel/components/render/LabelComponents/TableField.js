import React, { useRef } from 'react';
import ItemEdit from '../../ItemEdit';
import { Button } from 'antd';

export default function SelectTable(props) {
  const { field, label, value, handle } = props;
  const countId = useRef(0);

  function handleAppend() {
    countId.current = countId.current + 1;

    value.push({
      label: '新字段',
      field: countId.current,
    });

    handle(field, {
      target: {
        value,
      }
    });
  }
  function onChange(index, type, e) {
    const v = e.target.value;
    value[index][type] = v;

    handle(field, {
      target: {
        value,
      }
    });
  }
  function onRemove(index) {
    value.splice(index, 1);

    handle(field, {
      target: {
        value,
      }
    });
  }

  return <>
    <div>{label}</div>
    <Button icon="plus" onClick={handleAppend}>添加子项</Button>
    <br /><br />
    <ItemEdit
      items={value}
      valueField="field"
      onChange={onChange}
      onRemove={onRemove}
    />
  </>
}