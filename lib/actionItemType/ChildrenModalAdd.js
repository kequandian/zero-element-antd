import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ZEle from 'zero-element';
export default (props => {
  const {
    title,
    options,
    className,
    namespace,
    handle
  } = props;
  const {
    onCreate,
    onCreateList
  } = handle;
  const {
    modalTitle,
    modalWidth,
    childAppendField,
    ...rest
  } = options;
  const [visible, setVisible] = useState(false);

  function handleOpen() {
    setVisible(true);
  }

  function handleClose() {
    setVisible(false);
  }

  function handleSubmit(data) {
    if (childAppendField) {
      onCreateList(data[childAppendField]);
    } else {
      onCreate(data);
    }
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    onClick: handleOpen,
    className: className
  }, title), /*#__PURE__*/React.createElement(Modal, {
    title: modalTitle,
    width: modalWidth,
    visible: visible,
    destroyOnClose: true,
    onCancel: handleClose,
    bodyStyle: {
      padding: 0
    },
    footer: null
  }, /*#__PURE__*/React.createElement(ZEle, {
    MODAL: true,
    namespace: namespace,
    config: {
      layout: 'Empty',
      ...rest
    },
    onClose: handleClose,
    onSubmit: handleSubmit
  })));
});