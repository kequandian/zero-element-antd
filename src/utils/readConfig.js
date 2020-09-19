import React from 'react';
import { Form } from 'antd';
import FormIten from '@/container/Form/FormItemWrapped';
import ActionItem from '@/container/List/ActionItemWrapped';
import { getPageData } from 'zero-element/lib/Model';

import checkExpected from './checkExpected';


export function getFormItem(field, model,
  { namespace, form, handle = {}, hooks, extraData }
) {
  const {
    field: fieldName, label, value, extra = '', span,
    rules = [],
    type,
    options = {},
    expect,
    ...rest } = field;
  // const values = form.getFieldsValue();
  const { formData: values = {} } = getPageData(namespace);

  if (type === 'empty') {
    return null;
  }

  if (expect && expect.field) {
    handle.onExpect(expect.field);
  }
  if (!checkExpected({ ...extraData, ...values }, expect)) {
    return null;
  }

  return <Form.Item
    key={fieldName}
    label={label}
    span={span}
    name={fieldName}
    defaultValue={value}
    rules={[...rules.map(rule => handleRule(rule, values, handle))]}
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
      model={model}
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

function handleRule(rule, ...args) {

  if (typeof rule === 'string') {
    return ruleWrapped(defaultRule[rule] || defaultRule['undefined'], undefined);
  } else if (typeof rule === 'object') {
    const { type, message } = rule;
    if (type) {
      return ruleWrapped(defaultRule[type], message, rule, ...args);
    } else {
      return defaultRule['undefined'];
    }
  }
  return defaultRule['error'];
}

const defaultRule = {
  required: (msg, options, formData, handle) => {
    if (options) {
      const { expect } = options;
      if (expect && expect.field) {
        handle.onExpect(expect.field);
      }
      if (!checkExpected(formData, expect)) {
        return {};
      }
    }
    return {
      required: true,
      message: msg,
    };
  },
  email: (msg = '请输入正确的电子邮箱格式') => {
    return {
      validator(rule, value) {
        if (!value && value !== 0) return Promise.resolve();
        if (/\w+@\w+.\w+/.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject(msg);
      },
    }
  },
  phone: (msg = '请输入正确的手机号码格式') => {
    return {
      validator(rule, value) {
        if (!value && value !== 0) return Promise.resolve();
        if (/^1[3456789]\d{9}$/.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject(msg);
      },
    }
  },
  url: (msg = '请输入正确的网址格式') => {
    return {
      validator(rule, value) {
        if (!value && value !== 0) return Promise.resolve();
        if (/^(http|https):\/{2}[\w.]+/.test(value)) {
          return Promise.resolve();
        }
        return Promise.reject(msg);
      },
    }
  },
  error: () => {
    return {
      validator(rule, value) {
        return Promise.reject('传入了未知的 rules 校验格式');
      },
    }
  },
  undefined: () => {
    return {
      validator(rule, value) {
        return Promise.reject(`值: ${value} 使用了未知的校验规则`);
      },
    }
  },
};

function ruleWrapped(func, ...args) {
  return func.bind(null, ...args);
}