import React, { useState, useRef } from 'react';
import { Modal, Button, Radio } from 'antd';

export default function GlobalStyle({ layoutType, dispatch }) {
  const [visible, setVisible] = useState(false);
  const layoutValue = useRef('');

  function handleVisible() {
    setVisible(!visible);
  }
  function handleChange(e) {
    layoutValue.current = e.target.value;
  }
  function handleSave() {
    dispatch({
      type: 'save',
      payload: {
        layoutType: layoutValue.current,
      }
    });
    handleVisible();
  }

  return <div>
    <Button onClick={handleVisible}>全局样式</Button>
    <Modal
      destroyOnClose
      visible={visible}
      onOk={handleSave}
      onCancel={handleVisible}
    >
      <Radio.Group defaultValue={layoutType} onChange={handleChange}>
        <Radio value="horizontal">horizontal</Radio>
        <Radio value="vertical">vertical</Radio>
      </Radio.Group>
    </Modal>
  </div>
}