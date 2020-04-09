import React from 'react';
import { Drawer, Button } from 'antd';
import FieldItem from './FieldItem';
import '../../index.css';

export default ({
  visible, onSwitchVisibel, onSaveFields,
  fields = [],
  checkedList,
  onSwitchChecked, onMoveField,
}) => {
  const fieldItemProps = {
    checkedList,
    onSwitchChecked,
    onMoveField,
  };
  return <Drawer
    title="列表字段编辑"
    placement="right"
    closable={false}
    onClose={onSwitchVisibel}
    visible={visible}
  >
    {fields && fields.map(item => {
      return <FieldItem data={item} key={item.field} {...fieldItemProps} />
    })}
    <div className="ZEleA-ListFieldsEdit-divider">
      <Button onClick={onSwitchVisibel}>取消</Button>
      <Button type="primary" onClick={onSaveFields}>确定</Button>
    </div>
  </Drawer>
}