import React from 'react';
import { toNumber, returnFloatOne } from '@/utils/tool';

export default function valueTypePercentage(props) {
  const { options = {}, data: { text = '' } } = props;
  const { color, nullPlaceholder } = options;

  let v;
  if (text === null) {
    v = nullPlaceholder;
  }
  if (v === undefined) {
    if(text){
      v = `${returnFloatOne(toNumber(text))} %`;
    }else{
      v = '-'
    }
  }

  return <span style={{ color }}>
    {`${v}`}
  </span>
}
