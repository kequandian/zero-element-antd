import React from 'react';
import { Render } from 'zero-element/lib/config/formItemType';
import './index.css';

export default function FormItemWrapped({
  type, options,
  ...rest
}) {

  return <Render n={type}
    options={options} {...rest}
  />
}