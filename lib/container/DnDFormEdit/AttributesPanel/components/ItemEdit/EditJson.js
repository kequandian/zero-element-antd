function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useRef } from 'react';
import { Modal, Radio } from 'antd';
import ReactJson from 'react-json-view';
import { SettingOutlined } from '@ant-design/icons';
export default function EditJson({
  value,
  onChange
}) {
  const [visible, setVisible] = useState(false);
  const [initValue, setInitValue] = useState(value);
  const valueRef = useRef();

  function handleChange({
    updated_src
  }) {
    valueRef.current = updated_src;
  }

  function handleChangeInitValue(e) {
    setInitValue(JSON.parse(e.target.value));
  }

  function handleOpen() {
    setInitValue(value);
    setVisible(true);
  }

  function handleClose() {
    setVisible(false);
  }

  function handleSubmit() {
    onChange({
      target: {
        value: valueRef.current
      }
    });
    handleClose();
  }

  const defaultProps = {
    enableClipboard: false,
    displayDataTypes: false,
    name: false,
    onEdit: handleChange,
    onAdd: handleChange,
    onDelete: handleChange
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SettingOutlined, {
    onClick: handleOpen,
    style: {
      marginLeft: 16
    },
    title: "\u7F16\u8F91\u9009\u9879"
  }), /*#__PURE__*/React.createElement(Modal, {
    title: "\u7F16\u8F91\u9009\u9879",
    visible: visible,
    onOk: handleSubmit,
    onCancel: handleClose,
    destroyOnClose: true,
    maskClosable: false
  }, !value ? /*#__PURE__*/React.createElement(Radio.Group, {
    onChange: handleChangeInitValue,
    defaultValue: "{}"
  }, /*#__PURE__*/React.createElement(Radio, {
    value: "{}"
  }, "\u5BF9\u8C61"), /*#__PURE__*/React.createElement(Radio, {
    value: "[]"
  }, "\u6570\u7EC4")) : null, /*#__PURE__*/React.createElement(ReactJson, _extends({
    src: initValue
  }, defaultProps))));
}