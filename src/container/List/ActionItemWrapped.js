import React from 'react';
import { Render } from 'zero-element/lib/config/actionItemType';

export default function ActionItemWrapped({ type, ...rest }) {
  return <Render n={type}
    {...rest}
  />
}