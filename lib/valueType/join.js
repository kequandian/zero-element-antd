import React from 'react';
export default (props => {
  const {
    data: {
      text = '',
      record
    },
    options = {}
  } = props;
  const {
    symbol = '/'
  } = options;

  if (Array.isArray(text)) {
    return text.join(symbol);
  }

  return text;
});