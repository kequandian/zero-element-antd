import React from 'react';
import Thumb from '../../components/Thumb';

export default function ValueTypeImage(props) {
  const { options = {}, data: { text = '' } } = props;

  return <Thumb
    value={text}
    {...options}
  />
}