import React from 'react';
export default function valueTypePlain(props) {
  const {
    options = {},
    data: {
      text = ''
    }
  } = props;
  const {
    style
  } = options;
  return /*#__PURE__*/React.createElement("span", {
    style: style
  }, text);
}