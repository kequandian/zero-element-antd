function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useRef } from 'react';
import { Drawer, Button, Modal } from 'antd';
import ZEle from 'zero-element';
import FieldItem from "./FieldItem";
import "../../index.css";
import useArray from "../../../../utils/hooks/useArray";
export default (({
  namespace,
  visible,
  onSwitchVisibel,
  fields = [],
  onSaveFields
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const formRef = useRef();
  const [fieldList, handle] = useArray(fields);

  function handleOpenModal(data) {
    setModalData(data);
    setModalVisible(true);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  function handleSaveModal() {
    formRef.current.submit();
  }

  function handleOnMoveField(type, data) {
    handle.onMove(data._id, type);
  }

  function handleSwitchChecked(data) {
    const checked = data._checked === false ? true : false;
    handle.onUpdate(data._id, { ...data,
      _checked: checked
    });
  }

  function handleSubmit(submitData, handleResponse) {
    handle.onUpdate(submitData.id, submitData);
    handleCloseModal();
  }

  function handleSaveFields() {
    onSaveFields(fieldList);
  }

  const fieldItemProps = {
    onSwitchChecked: handleSwitchChecked,
    onMoveField: handleOnMoveField,
    onOpenModal: handleOpenModal
  };
  return /*#__PURE__*/React.createElement(Drawer, {
    title: "\u5217\u8868\u5B57\u6BB5\u7F16\u8F91",
    placement: "right",
    closable: false,
    onClose: onSwitchVisibel,
    visible: visible
  }, fieldList && fieldList.map(item => {
    return /*#__PURE__*/React.createElement(FieldItem, _extends({
      data: item,
      key: item._id
    }, fieldItemProps));
  }), /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-ListFieldsEdit-divider"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: onSwitchVisibel
  }, "\u53D6\u6D88"), /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: handleSaveFields
  }, "\u786E\u5B9A")), /*#__PURE__*/React.createElement(Modal, {
    title: "\u7F16\u8F91\u5B57\u6BB5\u5C5E\u6027",
    width: 660,
    visible: modalVisible,
    onOk: handleSaveModal,
    onCancel: handleCloseModal,
    destroyOnClose: true
  }, /*#__PURE__*/React.createElement(ZEle, {
    namespace: namespace,
    config: config,
    extraData: modalData,
    formRef: formRef,
    onSubmit: handleSubmit,
    footer: null
  })));
});
const config = {
  items: [{
    component: 'Form',
    config: {
      layout: "Grid",
      layoutConfig: {
        value: [12, 12]
      },
      fields: [{
        label: '名称',
        field: 'label',
        type: 'input'
      }, {
        label: '字段',
        field: 'field',
        type: 'input'
      }, {
        label: '类型',
        field: 'valueType',
        type: 'input'
      }, {
        label: '',
        field: 'id',
        type: 'hidden'
      }, {
        label: '配置',
        field: 'options',
        type: 'json',
        span: 24
      }]
    }
  }]
};