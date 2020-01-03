import React from 'react';
import { toNumber, returnFloat } from '@/utils/tool';

export default function valueTypePercentage(props) {
  const { options = {}, data: { text = '' } } = props;
  const { color, nullPlaceholder } = options;

  let v;
  if (text === null) {
    v = nullPlaceholder;
  }
  if (v === undefined) {
    v = returnFloat(toNumber(text));
  }

  return <div style={{ color }}>
    {`${v} %`}
  </div>
}
