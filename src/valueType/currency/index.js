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
    v = returnFloat(toNumber(text));
  }

  return <div style={{ color }}>
    {`${s} ${v}`}
  </div>
}

function returnFloat(value) {
  var value = Math.round(parseFloat(value) * 100) / 100;
  var s = value.toString().split(".");
  if (s.length == 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (s.length > 1) {
    if (s[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
}
