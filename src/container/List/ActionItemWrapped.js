import React from 'react';
import { Render } from 'zero-element/lib/config/actionItemType';

export default function ActionItemWrapped({ type, options = {}, ...rest }) {
  const { style = 'default', ...restOpt } = options;

  return <Render n={type}
    {...rest}
    options={restOpt}
    className={`ZEle-action-button ${style}`}
  />
}