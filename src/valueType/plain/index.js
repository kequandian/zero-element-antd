import React from 'react';

export default function valueTypePlain(props) {
  const { options = {}, data: { text = '' } } = props;
  const { style } = options;
  return <span style={style}>{text}</span>
}