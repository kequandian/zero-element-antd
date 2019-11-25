import React from 'react';

export default function valueTypeCurrency(props) {
  const { options = {}, data: { text = '' } } = props;
  const { symbol = '￥', color } = options;
  let v = Number(text);
  if (isNaN(v)) {
    v = text;
  }
  return <div style={{ color }}>
    {`${symbol} ${v.toLocaleString('en-US')}`}
  </div>
}