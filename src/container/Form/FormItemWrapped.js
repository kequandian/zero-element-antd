import React from 'react';
import { Tooltip } from 'antd';
import { Render } from 'zero-element-global/lib/formItemType';
import './index.css';

export default function FormItemWrapped({
  label, type, input, meta, options, required,
  ...rest
}) {
  const visibleError = Boolean(meta.error && meta.touched);
  if (type === 'hidden') {
    return <></>;
  }
  const labelClassNames = [
    'ZEleA-Form-item-label',
    required ? 'ant-form-item-required' : '',
    label ? 'ZEleA-Form-item-label-colon' : '',
  ];

  return <div className="ZEleA-Form-item">
    {label ? (
      <label className={labelClassNames.join(' ')}>
        {label}
      </label>
    ) : null}
    <div className="ZEleA-Form-item-element">
      <Render n={type}
        className={visibleError ? 'ZEleA-Form-ruleTips-error' : ''}
        options={options} {...input} {...rest}
      />
    </div>
    <div
      className="ZEleA-Form-ruleTips"
      className={visibleError ?
        'ZEleA-Form-ruleTips error' : 'ZEleA-Form-ruleTips'
      }
    >
      {visibleError ? (
        meta.error
      ) : null}
    </div>
  </div>
}