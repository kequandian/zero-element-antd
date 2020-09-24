import React from 'react';
import { Button } from 'antd';
import { Render } from 'zero-element/lib/config/valueType';
export default (props => {
  const {
    namespace,
    data: {
      text = '',
      index,
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
      }, /*#__PURE__*/React.createElement(Render, {
        n: "ellipsis",
        namespace: namespace,
        data: {
          text: item.name,
          record,
          index
        },
        options: {},
        handle: {}
      }));
    });
  }

  if (text) {
    return /*#__PURE__*/React.createElement(Button, {
      type: "link",
      size: "small",
      href: text
    }, /*#__PURE__*/React.createElement(Render, {
      n: "ellipsis",
      namespace: namespace,
      data: {
        text: record[fileName] || fileName,
        record,
        index
      },
      options: {},
      handle: {}
    }));
  }

  return '-';
});