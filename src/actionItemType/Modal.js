import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ZEle from 'zero-element';

export default (props) => {
  const { title, options, namespace, handle, ...restProps } = props;
  const { icon, modalTitle, modalWidth, ...rest } = options;
  const [visible, setVisible] = useState(false);

  function handleOpen() {
    setVisible(true);
  }
  function handleClose() {
    setVisible(false);
  }
  function handleCloseAndQuery() {
    setVisible(false);
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
        namespace={`${namespace}_actionModal`}
        {...restProps}
        config={{
          layout: 'Empty',
          ...rest,
        }}
        onClose={handleCloseAndQuery}
      />
    </Modal>
  </>
}