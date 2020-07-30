import React, { useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import TableCheckbox from "../formItemType/ModalCheckbox/TableCheckbox";
export default (props => {
  const {
    value,
    title,
    options,
    namespace,
    onCreateList,
    onGetFormData
  } = props;
  const {
    modalTitle,
    modalWidth,
    API,
    fields,
    field,
    value: optValue = 'id',
    requireValid,
    pagination,
    ...rest
  } = options;
  const [visible, setViseble] = useState(false);
  const selectedData = useRef([]);

  function handleOpen() {
    setViseble(true);
  }

  function handleClose() {
    setViseble(false);
  }

  function handleChange(data) {
    selectedData.current.push(...data);
  }

  function handleSave() {
    onCreateList(selectedData.current);
    handleClose();
  }

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    onClick: handleOpen,
    type: "primary"
  }, title), /*#__PURE__*/React.createElement(Modal, {
    title: modalTitle,
    width: modalWidth,
    visible: visible,
    destroyOnClose: true,
    onCancel: handleClose,
    bodyStyle: {// padding: 0,
    },
    onOk: handleSave
  }, /*#__PURE__*/React.createElement(TableCheckbox, {
    value: value,
    field: field,
    optValue: optValue,
    onChange: handleChange,
    onGetFormData: onGetFormData,
    API: API,
    fields: fields,
    pagination: pagination,
    requireValid: requireValid
  })));
});