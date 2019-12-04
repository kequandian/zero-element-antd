import React from 'react';
import { toNumber } from '@/utils/tool';

export default function valueTypeCurrency(props) {
  const { options = {}, data: { text = '' } } = props;
  const { symbol = '￥', color, nullPlaceholder } = options;

  let v;
  let s = symbol;
  if (text === null) {
    v = nullPlaceholder;
    s = '';
  }
  if (v === undefined) {
    v = toNumber(text);
  }

  return <div style={{ color }}>
    {`${s} ${v.toLocaleString('en-US')}`}
  </div>
}