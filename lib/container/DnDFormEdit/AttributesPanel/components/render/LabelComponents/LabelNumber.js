import React from 'react';
import { InputNumber } from 'antd';
export default function LabelNumber({
  field,
  label,
  value,
  handle
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, label), /*#__PURE__*/React.createElement(InputNumber, {
    value: value,
    onChange: handle.bind(null, field)
  }));
}