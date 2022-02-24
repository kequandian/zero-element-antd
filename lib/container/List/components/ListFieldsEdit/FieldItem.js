import React from 'react';
import { Flex } from "../../../../layout/Flex";
import { Checkbox } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, SettingOutlined } from '@ant-design/icons';
import "../../index.css";
const {
  FlexItem
} = Flex;
export default (({
  data,
  onSwitchChecked,
  onMoveField,
  onOpenModal
}) => {
  const checked = data._checked === false ? false : true;

  function onUp() {
    onMoveField('up', data);
  }

  function onDown() {
    onMoveField('down', data);
  }

  function onModal() {
    onOpenModal({ ...data,
      id: data._id
    });
  }

  return /*#__PURE__*/React.createElement(Flex, {
    className: "ZEleA-ListFieldsEdit-FieldItem"
  }, /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(Checkbox, {
    checked: checked,
    onChange: onSwitchChecked.bind(this, data)
  })), /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement("span", {
    className: "ZEleA-ListFieldsEdit-FieldItem-label",
    onClick: onSwitchChecked.bind(this, data)
  }, data.label)), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(ArrowUpOutlined, {
    className: "ZEleA-ListFieldsEdit-FieldItem-icon",
    onClick: onUp
  }), /*#__PURE__*/React.createElement(ArrowDownOutlined, {
    className: "ZEleA-ListFieldsEdit-FieldItem-icon",
    onClick: onDown
  }), /*#__PURE__*/React.createElement(SettingOutlined, {
    className: "ZEleA-ListFieldsEdit-FieldItem-icon",
    onClick: onModal
  })));
});