import React from 'react';
import { Tooltip } from 'antd';
import { Render } from 'zero-element-global/lib/formItemType';
import './index.css';

export default function FormItemWrapped({ label, type, input, meta, options, ...rest }) {
  const visibleError = Boolean(meta.error && meta.touched);
  if (type === 'empty') {
    return <></>;
  }
  return <div className="ZEle-Form-item">
    {label ? (
      <label className="ZEle-Form-item-label">
        {`${label}:`}
      </label>
    ) : null}
    <Tooltip
      visible={visibleError}
      title={meta.error}
      arrowPointAtCenter={true}
      overlayClassName="ZEle-Form-ruleTips"
    >
      <Render n={type}
        className={`ZEle-Form-item-element ${visibleError ? 'ZEle-Form-ruleTips-error' : ''}`}
        options={options} {...input} {...rest}
      />
    </Tooltip>
  </div>
}