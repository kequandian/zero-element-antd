import React from 'react';
import { Field } from 'react-final-form';
import FormIten from '@/container/Form/FormItemWrapped';
import ActionItem from '@/container/List/ActionItemWrapped';

import checkExpected from './checkExpected';


export function getFormItem(field, modelStatus, { namespace, values }) {
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
      {...rest}
    />}
  </Field>
}

export function getActionItem(action, modelStatus, namespace) {
  const { options = {} } = action;
  const listData = modelStatus[options.expectedPath || 'listData'];

  if (!checkExpected(listData, options)) {
    return null;
  }
  return <ActionItem
    namespace={namespace}
    {...action}
  />
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