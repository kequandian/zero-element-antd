import React, { useState, useRef } from 'react';
import { Modal, Input, Typography } from 'antd';

const { Text } = Typography;

export default ({ visible, onSave, onCancel, config }) => {
  const { title, value, tips } = config;
  const [error, setError] = useState('');
  const inputEl = useRef(null);
  function handleSave() {
    setError('');
    const newValue = inputEl.current.state.value;
    try {
      onSave(JSON.parse(newValue));
    } catch (error) {
      setError('输入了无效的 JSON 格式');
      inputEl.current.focus();
    }
  }
  return <Modal visible={visible}
    title="编辑整行的布局配置"
    onCancel={onCancel}
    onOk={handleSave}
  >
    <div>
      <Text>布局类型名: </Text>
    </div>
    <div>
      <Text strong>{title}</Text>
    </div>
    <br />
    <div>
      <Text>布局配置: </Text>
    </div>
    <Input ref={inputEl} defaultValue={JSON.stringify(value)} />
    <div style={{ color: 'red' }}>{error}</div>
    <Text type="secondary">{tips}</Text>
  </Modal>
}