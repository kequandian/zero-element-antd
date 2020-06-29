import React from 'react';
import { Form } from 'antd';
import FormIten from '@/container/Form/FormItemWrapped';
import ActionItem from '@/container/List/ActionItemWrapped';

import checkExpected from './checkExpected';


export function getFormItem(field, model,
  { namespace, form, handle, hooks }
) {
  const {
    field: fieldName, label, value, extra = '', span,
    rules = [],
    type,
    options = {},
    expect,
    ...rest } = field;
  const values = form.getFieldsValue();

  if (type === 'empty') {
    return null;
  }

  if (!checkExpected(values, expect || options)) {
    return null;
  }


  return <Form.Item
    key={fieldName}
    label={label}
    span={span}
    name={fieldName}
    defaultValue={value}
    rules={[...rules.map(handleRule)]}

    {...rest}
  >
    <FormIten
      name={fieldName}
      type={type}
      options={options}
      namespace={namespace}
      handle={handle}
      formdata={values}
      hooks={hooks}
      {...rest}
    />
  </Form.Item>
}

export function getActionItem(action, model, handle, props) {
  const { options = {}, expect } = action;
  const listData = model[options.expectedPath || 'listData'];

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

const defaultRule = {
  required: () => {
    return {
      required: true,
    };
  },
  // mail: (msg = '请输入正确的电子邮箱格式', value) => {
  //   if (!value && value !== 0) return undefined;
  //   return /\w+@\w+.\w+/.test(value) ? undefined : msg;
  // },
  // phone: (msg = '请输入正确的手机号码格式', value) => {
  //   if (!value && value !== 0) return undefined;
  //   return /^1[3456789]\d{9}$/.test(value) ? undefined : msg;
  // },
  error: value => (console.warn(`非法的 rules 子项: ${value}`) && undefined),
  undefined: value => (console.warn(`值: ${value} 使用了未知的校验规则`) && undefined),
};

function ruleWrapped(func, msg) {
  return func.bind(null, msg);
}