import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ZEle from 'zero-element';

export default (props) => {
  const { title, options, namespace, handle } = props;
  const { modalTitle, ...rest } = options;
  const [visible, setViseble] = useState(false);

  function handleOpen() {
    setViseble(true);
  }
  function handleClose() {
    setViseble(false);
  }
  function handleCloseAndQuery() {
    setViseble(false);
    if (typeof handle.onRefresh === 'function') {
      handle.onRefresh();
    }
  }

  return <div>
    <Button onClick={handleOpen} type="primary">
      {title}
    </Button>
    <Modal
      title={modalTitle}
      visible={visible}
      destroyOnClose={true}
      onCancel={handleClose}
      bodyStyle={{
        padding: 0,
      }}
      footer={null}
    >
      <ZEle
        MODAL={true}
        namespace={namespace}
        config={{
          layout: 'Empty',
          ...rest,
        }}
        onClose={handleCloseAndQuery}
      />
    </Modal>
  </div>
}