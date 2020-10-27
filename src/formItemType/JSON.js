import React from 'react';
import ReactJson from 'react-json-view';

export default function (props) {
  const { value, name, options = {}, onChange } = props;

  function handleChange({ updated_src }) {
    onChange(updated_src);
  }

  const defaultProps = {
    displayDataTypes: false,
    onEdit: handleChange,
    onAdd: handleChange,
    onDelete: handleChange,
    ...options,
  }

  return <ReactJson src={value} {...defaultProps} />;
}