import React from 'react';
import { Checkbox, Input } from 'antd';

export default function CheckboxWrapped({ field, data,
  onChange, onMsgChange
}) {
  const { label, value, message } = data || {};

  function handleChange(e) {
    onChange(field, e.target.checked ? field : undefined);
  }
  function handleMsgChange(e) {
    onMsgChange(field, e.target.value);
  }

  if (data) {
    if (message !== undefined) {
      return <div>
        <Checkbox
          checked={value === field}
          onChange={handleChange}
        >
          {label}
        </Checkbox>
        <Input value={message} onChange={handleMsgChange} />
        <br /><br />
      </div>
    }
    return <Checkbox
      checked={value === field}
      onChange={handleChange}
    >
      {label}
    </Checkbox>
  }
  return null;
}