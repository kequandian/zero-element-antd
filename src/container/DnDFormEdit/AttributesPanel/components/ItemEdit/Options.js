import React, { useState } from 'react';
import { Checkbox, Select, Modal, Button } from 'antd';
import ModalRadio from './ModalRadio';

const Option = Select.Option;

export default function Options({ index, data, disabled, onChange }) {
  const [visible, setVisible] = useState(false);
  const [optionsData, setOptionsData] = useState({});

  function handleChange(field, value) {
    onChange(index, field, value);
  }
  function handleOptionsChange(value) {
    setOptionsData(value);
  }
  function handleVisible() {
    if (!visible) {
      setOptionsData(data.options);
    }
    setVisible(!visible);
  }
  function handleOptionsSave() {
    handleVisible();
    onChange(index, 'options', optionsData);
  }

  if (!data) return null;

  return <div>
    <CheckboxWrapped
      title="显示在新增界面"
      field="echoAdd"
      value={data.echoAdd}
      disabled={disabled}
      onChange={handleChange}
    />
    <CheckboxWrapped
      title="显示在编辑界面"
      field="echoEdit"
      value={data.echoEdit}
      disabled={disabled}
      onChange={handleChange}
    />
    <SelectWrapped
      title="字段类型"
      field="type"
      value={data.echoType}
      disabled={disabled}
      onChange={handleChange}
    />
    {data.type === 'modal-radio' ?
      (
        <div>
          <br />
          <Button
            onClick={handleVisible}
          >
            编辑配置
          </Button>
          <Modal
            title="编辑 模态框-列表单选 配置"
            visible={visible}
            onCancel={handleVisible}
            onOk={handleOptionsSave}
          >
            <ModalRadio
              data={optionsData}
              onChange={handleOptionsChange}
            />
          </Modal>
        </div>
      ) : null}
  </div>
}

function CheckboxWrapped({ title, field, value, disabled, onChange }) {
  function handleChange(e) {
    onChange(field, e.target.checked);
  }

  if (value === undefined) return null;

  return <div>
    <Checkbox
      disabled={disabled}
      checked={value}
      onChange={handleChange}
    >
      {title}
    </Checkbox>
  </div>;
}

function SelectWrapped({ title, field, value, disabled, onChange }) {
  function handleChange(value) {
    onChange(field, value);
  }

  if (value === undefined) return null;

  return <div>
    <div>{title}</div>
    <Select
      style={{ width: 165 }}
      disabled={disabled}
      value={value}
      onChange={handleChange}
    >
      <Option value="plain">纯文本</Option>
      <Option value="input">输入框</Option>
      <Option value="number">数值输入框</Option>
      <Option value="date">时间</Option>
      <Option value="modal-radio">模态框-列表单选</Option>
    </Select>
  </div>
}