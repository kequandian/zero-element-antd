import React from 'react';
import { toNumber, returnFloat } from '@/utils/tool';
import './index.less';

export default function valueTypeCurrency(props) {
  const { options = {}, data: { text = '' } } = props;
  const { symbol = '￥', style, color, nullPlaceholder = '-' } = options;

  let v;
  let s = symbol;
  if (text === null) {
    v = nullPlaceholder;
    s = '';
  }
  if (v === undefined) {
    v = returnFloat(toNumber(text));
  }

  return <span className="ZEle-valueType-currency">
    <span className="label">{s}</span>
    <span style={{ ...style, color }}>{v}</span>
  </span>
}