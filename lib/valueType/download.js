import React from 'react';
import { Button } from 'antd';
export default (props => {
  const {
    data: {
      text = '',
      record
    },
    options = {}
  } = props;
  const {
    fileName = '下载'
  } = options;

  if (Array.isArray(text)) {
    return text.map((item, i) => {
      return /*#__PURE__*/React.createElement(Button, {
        type: "link",
        size: "small",
        key: item.id || i,
        href: item.url
      }, item.name);
    });
  }

  if (text) {
    return /*#__PURE__*/React.createElement(Button, {
      type: "link",
      size: "small",
      href: text
    }, record[fileName] || fileName);
  }

  return '无';
});