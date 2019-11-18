import React, { useState, useEffect } from 'react';
import Input from './Input';
import TableField from '../../render/LabelComponents/TableField';

export default function ModalRadioOptions({
  data = {},
  onChange,
}) {

  function handleChangeAPI(field, e) {
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
      onChange={handleChangeAPI}
      value={data.title}
    />
    <Input
      label="展示文本"
      field="label"
      onChange={handleChangeAPI}
      value={data.label}
    />
    <Input
      label="编辑时展示文本"
      field="editLabel"
      onChange={handleChangeAPI}
      value={data.editLabel}
    />
    <Input
      label="提交的字段"
      field="value"
      onChange={handleChangeAPI}
      value={data.value}
    />
    <Input
      label="API"
      field="API"
      onChange={handleChangeAPI}
      value={data.API}
    />
    <TableField
      field="fields"
      label="列表字段"
      value={data.fields || []}
      handle={handleChangeAPI}
    />
  </div>
}