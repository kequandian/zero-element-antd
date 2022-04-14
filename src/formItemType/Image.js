import React from 'react';
import ImageView from '@/components/ImageView';

export default function Image(props) {
  const { value, options, } = props;

  let imageList = value;

  if(imageList && imageList.indexOf(',') != -1){
    imageList = imageList.split(',')
  }

  return <ImageView {...options} value={imageList} />
}