import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ZEle from 'zero-element';

export default (props) => {
  const { title, options, namespace, onCreate } = props;
  const { modalTitle, modalWidth, ...rest } = options;
  const [visible, setViseble] = useState(false);

  function handleOpen() {
    setViseble(true);
  }
  function handleClose() {
    setViseble(false);
  }

  return <div>
    <Button onClick={handleOpen} type="primary">
      {title}
    </Button>
    <Modal
      title={modalTitle}
      width={modalWidth}
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
        onClose={handleClose}
        onSubmit={onCreate}
      />
    </Modal>
  </div>
}