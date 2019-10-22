import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ZEle from 'zero-element';

export default (props) => {
  const { title, options, namespace, handle, ...restProps } = props;
  const { icon, modalTitle, modalWidth, ...rest } = options;
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

  return <>
    <Button onClick={handleOpen} type="primary" icon={icon}>
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
        {...restProps}
        onClose={handleCloseAndQuery}
      />
    </Modal>
  </>
}