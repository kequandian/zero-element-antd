import React, { useState, useRef } from 'react';
import { Modal, Radio } from 'antd';
import ReactJson from 'react-json-view';
import {
  SettingOutlined,
} from '@ant-design/icons';


export default function EditJson({ value, onChange }) {
  const [visible, setVisible] = useState(false);
  const [initValue, setInitValue] = useState(value);
  const valueRef = useRef();

  function handleChange({ updated_src }) {
    valueRef.current = updated_src;
  }
  function handleChangeInitValue(e) {
    setInitValue(JSON.parse(e.target.value));
  }

  function handleOpen() {
    setInitValue(value);
    setVisible(true);
  }
  function handleClose() {
    setVisible(false);
  }
  function handleSubmit() {
    onChange({
      target: {
        value: valueRef.current,
      },
    });
    handleClose();
  }

  const defaultProps = {
    enableClipboard: false,
    displayDataTypes: false,
    name: false,
    onEdit: handleChange,
    onAdd: handleChange,
    onDelete: handleChange,
  }

  return <>
    <SettingOutlined onClick={handleOpen} style={{ marginLeft: 16 }} title="编辑选项" />
    <Modal
      title="编辑选项"
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleClose}
      destroyOnClose
      maskClosable={false}
    >
      {!value ? (
        <Radio.Group onChange={handleChangeInitValue} defaultValue="{}">
          <Radio value="{}">对象</Radio>
          <Radio value="[]">数组</Radio>
        </Radio.Group>
      ) : null}
      <ReactJson src={initValue} {...defaultProps} />
    </Modal>
  </>
}