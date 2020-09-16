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
        key: item.id || i,
        type: "link",
        href: item.url
      }, item.name);
    });
  }

  if (text) {
    return /*#__PURE__*/React.createElement(Button, {
      type: "link",
      href: text
    }, record[fileName] || fileName);
  }

  return '无';
});