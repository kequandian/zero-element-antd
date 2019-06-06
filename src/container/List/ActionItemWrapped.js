import React from 'react';
import { Render } from 'zero-element-global/lib/actionItemType';

export default function ActionItemWrapped({ type, ...rest }) {
  return <Render n={type}
    {...rest}
  />
}