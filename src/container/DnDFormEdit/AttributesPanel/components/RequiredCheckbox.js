import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';

export default function RequiredCheckbox({ data, onChange }) {
  function handleChange(e) {
    onChange('required', e.target.checked ? 'required' : undefined);
  }
  if (data.required) {
    return <Checkbox
      checked={data.required.value === 'required'}
      onChange={handleChange}
    >必填</Checkbox>
  }
  return null;
}