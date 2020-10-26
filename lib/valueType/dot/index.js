import React from 'react';
import { Tag } from 'antd';
import defaultMap from "../map/status.config";
import "./index.less";
export default function valueTypeDot(props) {
  const {
    options = {},
    data: {
      text = '-'
    }
  } = props;
  const {
    color = {},
    map = {}
  } = options;
  return /*#__PURE__*/React.createElement("span", {
    className: "ZEle-valueType-dot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot",
    style: {
      backgroundColor: color[text]
    }
  }), map[text] || defaultMap[text] || text);
}