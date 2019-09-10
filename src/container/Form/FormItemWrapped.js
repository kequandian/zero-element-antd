import React from 'react';
import { Tooltip } from 'antd';
import { Render } from 'zero-element-global/lib/formItemType';
import './index.css';

export default function FormItemWrapped({ label, type, input, meta, options, ...rest }) {
  const visibleError = Boolean(meta.error && meta.touched);
  if (type === 'hidden') {
    return <></>;
  }
  return <div className="ZEleA-Form-item">
    {label ? (
      <label className="ZEleA-Form-item-label">
        {`${label}:`}
      </label>
    ) : null}
    <Tooltip
      visible={visibleError}
      title={meta.error}
      arrowPointAtCenter={true}
      overlayClassName="ZEleA-Form-ruleTips"
    >
      <Render n={type}
        className={`ZEleA-Form-item-element ${visibleError ? 'ZEleA-Form-ruleTips-error' : ''}`}
        options={options} {...input} {...rest}
      />
    </Tooltip>
  </div>
}