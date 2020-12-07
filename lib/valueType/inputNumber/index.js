function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { toNumber } from "../../utils/tool";
import { InputNumber } from 'antd';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import _ from 'lodash';
export default function ValueTypeInputNumber(props) {
  const {
    field,
    handle,
    options = {},
    data: {
      index,
      text = '',
      record
    }
  } = props;
  const {
    onEdit
  } = handle;
  const {
    defaultValue,
    maxField,
    ...restOpt
  } = options;
  const v = toNumber(text);
  useDidMount(_ => {
    if (v === '' && defaultValue !== undefined) {
      handleChange(defaultValue);
    } else if (v) {
      handleChange(v);
    }
  });

  function handleChange(value) {
    _.set(record, field, toNumber(value));

    onEdit && onEdit(index, record);
  }

  const maxValue = maxField ? _.get(record, maxField) : undefined;
  return /*#__PURE__*/React.createElement(InputNumber, _extends({
    value: v,
    onChange: handleChange,
    max: maxValue
  }, restOpt));
}