import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import DrawerContent from "./DrawerContent";
import "../../index.css";
export default function ListFieldsEdit(props) {
  const {
    fields = [],
    handle,
    namespace
  } = props;
  const {
    onFieldsOrder
  } = handle;
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
    onSaveFields
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ZEleA-ListFieldsEdit-settingIcon",
    onClick: onSwitchVisibel
  }, /*#__PURE__*/React.createElement(SettingOutlined, {
    title: "\u7F16\u8F91\u5B57\u6BB5"
  })), /*#__PURE__*/React.createElement(DrawerContent, drawerProps));
}