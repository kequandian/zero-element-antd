import React from 'react';

export default function valueTypeCurrency(props) {
  const { options = {}, data: { text = '' } } = props;
  const { symbol = '￥' } = options;
  let v = Number(text);
  if (isNaN(v)) {
    v = text;
  }
  return `${symbol} ${v.toLocaleString('en-US')}`;
}