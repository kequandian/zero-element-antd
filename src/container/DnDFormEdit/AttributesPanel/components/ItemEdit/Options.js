import React from 'react';
import { Checkbox, Select } from 'antd';

const Option = Select.Option;

export default function Options({ index, data, disabled, onChange }) {

  function handleChange(field, value) {
    onChange(index, field, value);
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
    <CheckboxWrapped
      title="只读"
      field="onlyRead"
      value={data.onlyRead}
      disabled={disabled}
      onChange={handleChange}
    />
    <SelectWrapped
      title="字段类型"
      field="type"
      value={data.type}
      disabled={disabled}
      onChange={handleChange}
    />
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
    </Select>
  </div>
}