import React from 'react';
import { Field } from 'react-final-form';
import FormIten from '@/container/Form/FormItemWrapped';
import ActionItem from '@/container/List/ActionItemWrapped';

import checkExpected from './checkExpected';


export function getFormItem(field, modelStatus, { namespace, values, handle }) {
  const {
    field: fieldName, label, value, extra = '', span,
    rules = [],
    type,
    options = {},
    ...rest } = field;
  const formData = modelStatus[options.expectedPath || 'formData'];

  if (!checkExpected({
    ...formData,
    ...values,
  }, options)) {
    return null;
  }

  return <Field
    key={fieldName}
    name={fieldName}
    span={span}
    parse={(value) => value}
    {...rest}
    validate={composeValidators(...rules.map(handleRule))}
  >
    {({ input, meta }) => <FormIten
      label={label}
      type={type}
      options={options}
      input={input}
      meta={meta}
      defaultValue={value}
      namespace={namespace}
      handle={handle}
      required={rules.findIndex(r => r === 'required') > -1}
      {...rest}
    />}
  </Field>
}

export function getActionItem(action, modelStatus, handle, props) {
  const { options = {} } = action;
  const listData = modelStatus[options.expectedPath || 'listData'];

  if (!checkExpected(listData, options)) {
    return null;
  }
  return <ActionItem
    {...props}
    {...action}
    handle={handle}
  />
}

function handleRule(rule) {
  if (typeof rule === 'string') {
    return defaultRule[rule] || defaultRule['undefined'];
  }
  return defaultRule['error'];
}

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const defaultRule = {
  required: value => (value ? undefined : '必填'),
  error: value => (console.warn(`非法的 rules 子项: ${value}`) && undefined),
  undefined: value => (console.warn(`值: ${value} 使用了未知的校验规则`) && undefined),
};