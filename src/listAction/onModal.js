import React from 'react';
import { Modal } from 'antd';
import ZEle from 'zero-element';

export default function onModal(props, context) {
  const { options } = props;
  const { namespace, extra } = context;
  const { modalTitle, ...rest } = options;

  function handleClose() {
    extra.modal = null;
  }

  extra.modal = <Modal
    title={modalTitle}
    visible={true}
    onCancel={handleClose}
    bodyStyle={{
      padding: 0,
    }}
    footer={null}
  >
    <ZEle
      MODAL={true}
      namespace={namespace}
      config={rest}
      onClose={handleClose}
    />
  </Modal>
}