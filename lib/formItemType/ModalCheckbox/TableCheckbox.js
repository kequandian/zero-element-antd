import React from 'react';
import TableSelect from "../TableSelect";
export default function TableCheckbox({
  namespace,
  value,
  field,
  optValue,
  onChange,
  onGetFormData,
  ...rest // API fields pagination requireValid

}) {
  return /*#__PURE__*/React.createElement(TableSelect, {
    namespace: namespace,
    value: getSelectedKeys(value, onGetFormData, {
      field,
      vField: optValue
    }) // value={typeof value === 'object' ? [value] : [{ [optValue]: value }]}
    ,
    onChange: onChange,
    options: {
      type: 'checkbox',
      value: optValue,
      ...rest
    }
  });
}

function getSelectedKeys(data, getFormData, {
  field,
  vField
}) {
  if (data) {
    if (Array.isArray(data.value)) {
      return data.value;
    }
  }

  const formData = getFormData();

  if (formData) {
    if (typeof formData === 'object') {
      if (Array.isArray(formData[field])) {
        return formData[field];
      }
    }
  }

  return undefined;
}