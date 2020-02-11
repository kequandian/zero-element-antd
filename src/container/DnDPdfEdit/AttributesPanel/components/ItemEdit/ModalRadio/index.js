import React, { useState, useEffect } from 'react';
import Input from './Input';
import TableField from '../../render/LabelComponents/TableField';
import SaveData from '../../render/LabelComponents/SaveData';

export default function ModalRadioOptions({
  data = {},
  onChange,
}) {

  function handleChange(field, e) {
    const value = e.target.value;
    onChange({
      ...data,
      [field]: value,
    });
  }

  return <div>
    <Input
      label="引导文本"
      field="title"
      onChange={handleChange}
      value={data.title}
    />
    <Input
      label="展示文本"
      field="label"
      onChange={handleChange}
      value={data.label}
    />
    <Input
      label="编辑时展示文本"
      field="editLabel"
      onChange={handleChange}
      value={data.editLabel}
    />
    <Input
      label="提交的字段"
      field="value"
      onChange={handleChange}
      value={data.value}
    />
    <Input
      label="API"
      field="API"
      onChange={handleChange}
      value={data.API}
    />
    <br /><br />
    <TableField
      field="fields"
      label="列表字段"
      value={data.fields || []}
      handle={handleChange}
    />
    <SaveData
      field="saveData"
      label="添加额外保存数据"
      tLabel="把选择的数据的字段"
      tValue="保存为以下字段"
      value={data.saveData || {}}
      handle={handleChange}
    />
  </div>
}