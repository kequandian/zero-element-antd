import React from 'react';
import { toNumber, returnFloat } from "../../utils/tool";
import "./index.less";
export default function valueTypeCurrency(props) {
  const {
    options = {},
    data: {
      text = ''
    }
  } = props;
  const {
    symbol = '￥',
    color = '#610b0b',
    nullPlaceholder = '-'
  } = options;
  let v;
  let s = symbol;

  if (text === null) {
    v = nullPlaceholder;
    s = '';
  }

  if (v === undefined) {
    v = returnFloat(toNumber(text));
  }

  return /*#__PURE__*/React.createElement("span", {
    className: "ZEle-valueType-currency"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, s), /*#__PURE__*/React.createElement("span", null, v));
}