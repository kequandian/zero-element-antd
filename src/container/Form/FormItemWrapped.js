import React from 'react';
import { Tooltip } from 'antd';
import { Render } from 'zero-element-global/lib/formItenType';
import './index.css';

export default function FormItemWrapped({ label, type, input, meta, options, ...rest }) {
  const visibleError = Boolean(meta.error && meta.touched);
  return <>
    <label>
      {`${label}: `}
    </label>
    <Tooltip
      visible={visibleError}
      title={meta.error}
      arrowPointAtCenter={true}
      overlayClassName="ZEle-Form-ruleTips"
    >
      <Render n={type}
        className={visibleError ? 'ZEle-Form-ruleTips-error' : ''}
        options={options} {...input} {...rest}
      />
    </Tooltip>
  </>
}