import React from 'react';
import SelectFetch from "../../formItemType/SelectFetch";
export default function valueTypeInputSelectFetch(props) {
  const {
    field,
    handle,
    options,
    data: {
      index,
      text = '',
      record
    }
  } = props;
  const {
    onEdit
  } = handle;

  function handleChange(e) {
    const {
      target
    } = e;
    const {
      value
    } = target;
    record[field] = value;
    onEdit(index, record);
  }

  return /*#__PURE__*/React.createElement(SelectFetch, {
    value: text,
    options: options,
    onChange: handleChange
  });
}