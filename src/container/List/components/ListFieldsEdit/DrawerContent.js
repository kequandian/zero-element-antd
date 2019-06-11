import React from 'react';
import { Drawer, Button } from 'antd';
import FieldItem from './FieldItem';
import '../index.css';

export default ({
  visible, onSwitchVisibel, onSaveFields,
  advancedConfig = [],
  checkedList, onSwitchChecked,
}) => {
  const fieldItemProps = {
    checkedList,
    onSwitchChecked,
  };
  return <Drawer
    title="列表字段编辑"
    placement="right"
    closable={false}
    onClose={onSwitchVisibel}
    visible={visible}
  >
    {advancedConfig && advancedConfig.map(item => {
      return <FieldItem data={item} key={item.field} {...fieldItemProps} />
    })}
    <div className="ZEleA-ListFieldsEdit-divider">
      <Button onClick={onSwitchVisibel}>取消</Button>
      <Button type="primary" onClick={onSaveFields}>确定</Button>
    </div>
  </Drawer>
}