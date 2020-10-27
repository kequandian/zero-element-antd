import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';

import DrawerContent from './DrawerContent';
import '../../index.css';

export default function ListFieldsEdit(props) {
  const { fields = [], handle, namespace } = props;
  const { onFieldsOrder } = handle;

  const [visible, setVisibel] = useState(false);

  function onSwitchVisibel() {
    setVisibel(!visible);
  }
  function onSaveFields(fieldList) {
    onSwitchVisibel();
    onFieldsOrder(fieldList);
  }

  const drawerProps = {
    namespace,
    fields,
    visible,
    onSwitchVisibel,
    onSaveFields,
  };
  return <>
    <span
      className="ZEleA-ListFieldsEdit-settingIcon"
      onClick={onSwitchVisibel}
    >
      <SettingOutlined title="编辑字段" />
    </span>
    <DrawerContent {...drawerProps} />
  </>
}