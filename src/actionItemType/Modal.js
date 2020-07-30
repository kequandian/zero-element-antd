import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ZEle from 'zero-element';

export default (props) => {
  const { title, options, namespace, handle, hooks = {}, ...restProps } = props;
  const { icon, modalTitle, modalWidth, ...rest } = options;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(undefined);
  const { onSubmitActionModal } = hooks;

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
    if (loading) {
      setLoading(false);
    }
  }

  function handleSubmit(data, handleResponse) {
    setLoading(true);
    onSubmitActionModal(data, handleResponse)
      .finally(_ => setLoading(false));
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
        // namespace={`${namespace}_actionModal`}
        namespace={namespace}
        {...restProps}
        config={{
          layout: 'Empty',
          ...rest,
        }}
        onClose={handleCloseAndQuery}
        onSubmit={onSubmitActionModal ? handleSubmit : undefined}
        loading={loading}
      />
    </Modal>
  </>
}