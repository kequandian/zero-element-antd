import React from 'react';
import ImageView from '@/components/ImageView';

export default function ValueTypeImage(props) {
  const { options = {}, data: { text = '' } } = props;

  return <ImageView
    value={text}
    {...options}
  />
}