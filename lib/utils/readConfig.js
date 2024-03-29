function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Form, Tooltip } from 'antd';
import FormIten from "../container/Form/FormItemWrapped";
import ActionItem from "../container/List/ActionItemWrapped";
import { getPageData } from 'zero-element/lib/Model';
import { QuestionCircleOutlined } from '@ant-design/icons';
import checkExpected from "./checkExpected";
import Penetrate from "../components/Penetrate";
const iconStyle = {
  color: '#108ee9',
  marginLeft: 4
};
export function getFormItem(field, model, {
  namespace,
  form,
  style,
  handle = {},
  hooks,
  extraData,
  childformdata
}) {
  const {
    field: fieldName,
    label,
    value,
    extra = '',
    span,
    rules = [],
    type,
    options = {},
    tips,
    expect,
    ...rest
  } = field;
  const search = style ? `_Search_` : `_Default_Search`;
  const formValues = form.getFieldsValue(); // 同时兼容 Search 和 Form 的初始值

  const {
    formData: values = {}
  } = getPageData(namespace) || {};
  const vailFormData = { ...formValues,
    ...values
  };

  if (type === 'empty') {
    return null;
  }

  if (expect && expect.field) {
    handle.onExpect(expect.field);
  }

  if (!checkExpected({ ...extraData,
    ...vailFormData
  }, expect)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(Form.Item, _extends({
    key: fieldName,
    label: label,
    span: span,
    className: tips ? 'ZEleA-Form-tips-container' : '',
    name: fieldName,
    defaultValue: value,
    rules: [...rules.map(rule => handleRule(rule, namespace, handle))]
  }, rest), /*#__PURE__*/React.createElement(Penetrate, null, /*#__PURE__*/React.createElement(FormIten, _extends({
    name: fieldName,
    type: type,
    options: options,
    namespace: namespace,
    handle: handle,
    className: style ? `${search} ${style}` : `${search}`,
    formdata: vailFormData,
    childformdata: childformdata,
    hooks: hooks
  }, rest, {
    model: model
  })), tips ? /*#__PURE__*/React.createElement(Tooltip, {
    title: /*#__PURE__*/React.createElement("pre", null, tips)
  }, /*#__PURE__*/React.createElement(QuestionCircleOutlined, {
    style: iconStyle
  })) : null));
}
export function getActionItem(action, model, handle, props) {
  const {
    options = {},
    expect
  } = action;
  const listData = model[options.expectedPath || 'listData'];

  if (!checkExpected(listData, expect || options)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(ActionItem, _extends({}, props, action, {
    handle: handle
  }));
}

function handleRule(rule, ...args) {
  if (typeof rule === 'string') {
    return ruleWrapped(defaultRule[rule] || defaultRule['undefined'], undefined);
  } else if (typeof rule === 'object') {
    const {
      type,
      message
    } = rule;

    if (type) {
      return ruleWrapped(defaultRule[type], message, rule, ...args);
    } else {
      return defaultRule['undefined'];
    }
  }

  return defaultRule['error'];
}

const defaultRule = {
  required: (msg, options, namespace, handle) => {
    let pageData = getPageData(namespace) || {};
    let formData = pageData.formData || {};

    if (options) {
      const {
        expect
      } = options;

      if (expect && expect.field) {
        handle.onExpect(expect.field);
      }

      if (!checkExpected(formData, expect)) {
        return {};
      }
    }

    return {
      required: true,
      message: msg
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
      }

    };
  },
  phone: (msg = '请输入正确的手机号码格式') => {
    return {
      validator(rule, value) {
        if (!value && value !== 0) return Promise.resolve();

        if (/^1[3456789]\d{9}$/.test(value)) {
          return Promise.resolve();
        }

        return Promise.reject(msg);
      }

    };
  },
  url: (msg = '请输入正确的网址格式') => {
    return {
      validator(rule, value) {
        if (!value && value !== 0) return Promise.resolve();

        if (/^(http|https):\/{2}[\w.]+/.test(value)) {
          return Promise.resolve();
        }

        return Promise.reject(msg);
      }

    };
  },
  password: (msg = '两次输入的密码不一致', options, namespace, handle) => {
    const {
      field = 'password'
    } = options;
    let pageData = getPageData(namespace) || {};
    let formData = pageData.formData || {};
    return {
      validator(rule, value) {
        if (!value && value !== 0) return Promise.resolve();

        if (value === formData[field]) {
          return Promise.resolve();
        }

        return Promise.reject(msg);
      }

    };
  },
  error: () => {
    return {
      validator(rule, value) {
        return Promise.reject('传入了未知的 rules 校验格式');
      }

    };
  },
  undefined: () => {
    return {
      validator(rule, value) {
        return Promise.reject(`值: ${value} 使用了未知的校验规则`);
      }

    };
  }
};

function ruleWrapped(func, ...args) {
  return func.bind(null, ...args);
}