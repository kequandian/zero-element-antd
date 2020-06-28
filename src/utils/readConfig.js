import React from 'react';
import { Field } from 'react-final-form';
import FormIten from '@/container/Form/FormItemWrapped';
import ActionItem from '@/container/List/ActionItemWrapped';

import checkExpected from './checkExpected';


export function getFormItem(field, model,
  { namespace, values, handle, bindOnChange, hooks }
) {
  const {
    field: fieldName, label, value, extra = '', span,
    rules = [],
    type,
    options = {},
    expect,
    ...rest } = field;
  const formData = model[options.expectedPath || 'formData'];

  if (type === 'empty') {
    return null;
  }
  if (options.expectedField) {
    console.warn('options 的 expectedField 即将弃用，请改为放在 expect 内');
  }

  if (!checkExpected({
    ...formData,
    ...values,
  }, expect || options)) {
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
    {({ input, meta }) => {
      if (bindOnChange) {
        bindOnChange(input.name, input.onChange);
      }
      return <FormIten
        label={label}
        type={type}
        options={options}
        input={input}
        meta={meta}
        defaultValue={value}
        namespace={namespace}
        handle={handle}
        required={rules.findIndex(r => r === 'required') > -1}
        formdata={values}
        hooks={hooks}
        {...rest}
      />
    }
    }
  </Field>
}

export function getActionItem(action, model, handle, props) {
  const { options = {}, expect } = action;
  const listData = model[options.expectedPath || 'listData'];

  if (options.expectedField) {
    console.warn('options 的 expectedField 即将弃用，请改为放在 expect 内');
  }
  if (!checkExpected(listData, expect || options)) {
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
    return ruleWrapped(defaultRule[rule]) || defaultRule['undefined'];
  } else if (typeof rule === 'object') {
    const { type, message } = rule;
    if (type) {
      return ruleWrapped(defaultRule[type], message);
    } else {
      return defaultRule['undefined'];
    }
  }
  return defaultRule['error'];
}

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const defaultRule = {
  required: (msg = '必填', value) => {
    return (Boolean(value) || value === 0) ? undefined : msg;
  },
  mail: (msg = '请输入正确的电子邮箱格式', value) => {
    if (!value && value !== 0) return undefined;
    return /\w+@\w+.\w+/.test(value) ? undefined : msg;
  },
  phone: (msg = '请输入正确的手机号码格式', value) => {
    if (!value && value !== 0) return undefined;
    return /^1[3456789]\d{9}$/.test(value) ? undefined : msg;
  },
  error: value => (console.warn(`非法的 rules 子项: ${value}`) && undefined),
  undefined: value => (console.warn(`值: ${value} 使用了未知的校验规则`) && undefined),
};

function ruleWrapped(func, msg) {
  return func.bind(null, msg);
}