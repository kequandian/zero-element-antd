import React, { useState } from 'react';
import { Icon } from 'antd';

import DrawerContent from './DrawerContent';

export default ListFieldsEdit = (props) => {
  const [visible, setVisibel] = useState(false);
  const [checkedList, setCheckedList] = useState([]);

  function onSwitchVisibel() {
    setVisibel(!visible);
  }
  function onSwitchChecked(data) {
    const field = data.field;
    let newCheckedList = [...checkedList];
    const index = newCheckedList.findIndex(key => key === field);
    if (index > -1) {
      newCheckedList.splice(index, 1);
    } else {
      newCheckedList.push(field);
    }
    setCheckedList(newCheckedList);
  }
  function onSaveFields() {
    onSwitchVisibel();
  }

  const drawerProps = {
    visible,
    onSwitchVisibel,
    checkedList,
    onSwitchChecked,
    onSaveFields,
  };
  return <>
    <span style={{ paddingRight: '6px' }} onClick={onSwitchVisibel}>
      <Icon type="setting" />
    </span>
    <DrawerContent {...drawerProps} />
  </>
}