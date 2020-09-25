import React from 'react';
import ImageView from '@/components/ImageView';

export default function Image(props) {
  const { value, options, } = props;

  return <ImageView {...options} value={value} />
}