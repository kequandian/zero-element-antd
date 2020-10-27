function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import ReactJson from 'react-json-view';
export default function (props) {
  const {
    value,
    name,
    options = {},
    onChange
  } = props;

  function handleChange({
    updated_src
  }) {
    onChange(updated_src);
  }

  const defaultProps = {
    enableClipboard: false,
    displayDataTypes: false,
    name: false,
    onEdit: handleChange,
    onAdd: handleChange,
    onDelete: handleChange,
    ...options
  };
  return /*#__PURE__*/React.createElement(ReactJson, _extends({
    src: value
  }, defaultProps));
}