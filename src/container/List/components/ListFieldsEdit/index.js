import React, { useState } from 'react';
import { Icon } from 'antd';

import DrawerContent from './DrawerContent';
import { arrayItemMove } from '@/utils/tool';
import '../../index.css';

export default function ListFieldsEdit(props) {
  const { fields = [], handle } = props;
  const { onFieldsOrder } = handle;

  const [visible, setVisibel] = useState(false);
  const [checkedList, setCheckedList] = useState(
    fields.map(i => i.field)
  );

  function onSwitchVisibel() {
    setVisibel(!visible);
  }
  function onSwitchChecked(data) {
    const { field } = data;

    let newCheckedList = [...checkedList];
    const index = newCheckedList.findIndex(key => key === field);
    if (index > -1) {
      newCheckedList.splice(index, 1);
    } else {
      newCheckedList.push(field);
    }
    setCheckedList(newCheckedList);
  }
  function onMoveField(type, data) {
    const { field } = data;
    const index = checkedList.findIndex(i => i === field);
    arrayItemMove(checkedList, type, index);
    arrayItemMove(fields, type, index);
    setCheckedList([...checkedList]);
  }

  function onSaveFields() {
    onSwitchVisibel();
    onFieldsOrder(checkedList);
  }

  const drawerProps = {
    fields,
    visible,
    onSwitchVisibel,
    checkedList,
    onSwitchChecked,
    onMoveField,
    onSaveFields,
  };
  return <>
    <span
      className="ZEleA-ListFieldsEdit-settingIcon"
      onClick={onSwitchVisibel}
    >
      <Icon type="setting" title="编辑字段" />
    </span>
    <DrawerContent {...drawerProps} />
  </>
}