import React from 'react';
import { Modal } from 'antd';
import ZEle from 'zero-element';

export default function onModal(props, context) {
  const { options } = props;
  const { namespace, extra } = context;
  const { modalTitle, ...rest } = options;

  extra.modal = <Modal
    title={modalTitle}
    visible={true}
    onCancel={() => {
      extra.modal = null;
    }}
    footer={extra.modalFooter || null}
  >
    <ZEle namespace={namespace} config={rest} />
  </Modal>
}