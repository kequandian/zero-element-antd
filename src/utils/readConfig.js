import React from 'react';
import { Field } from 'react-final-form';
import FormIten from '@/container/Form/FormItemWrapped';

import checkExpected from './checkExpected';




export function getFormItem(field, modelStatus) {
  const {
    field: fieldName, label, value, extra = '', span,
    rules = [],
    type,
    options = {},
    ...rest } = field;
  const formData = modelStatus[options.expectedPath || 'formData'];

  if (!checkExpected(formData, options)) {
    return null;
  }

  return <Field
    key={fieldName}
    name={fieldName}
    span={span}
    {...rest}
    validate={composeValidators(...rules.map(handleRule))}
  >
    {({ input, meta }) => <FormIten
      label={label}
      type={type}
      options={options}
      input={input}
      meta={meta}
      {...rest}
    />}
  </Field>
}

function handleRule(rule) {
  if (typeof rule === 'string') {
    return defaultRule[rule] || defaultRule['undefined'];
  }
}

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const defaultRule = {
  required: value => (value ? undefined : '必填'),
  undefined: value => (console.warn(`值: ${value} 使用了未知的校验规则`) && undefined),
};