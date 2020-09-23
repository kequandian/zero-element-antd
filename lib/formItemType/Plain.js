function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useEffect } from 'react';
import { formatAPI } from 'zero-element/lib/utils/format';
export default (props => {
  const {
    name,
    namespace,
    props: propsOtp,
    defaultValue,
    value = defaultValue,
    options,
    formdata,
    onChange,
    ...rest
  } = props;
  const {
    format,
    placeholder = '-',
    symbol = '/',
    map,
    autoSave = false
  } = options;
  let v = value;

  if (format) {
    const rst = [];

    if (Array.isArray(format)) {
      format.forEach(f => {
        rst.push(formatAPI(f, {
          namespace,
          placeholder,
          data: formdata
        }));
      });
    } else {
      rst.push(formatAPI(format, {
        namespace,
        placeholder,
        data: formdata
      }));
    }

    v = rst.join('\n');
  }

  if (map) {
    v = map[v];
  }

  if (Array.isArray(v)) {
    v = v.join(symbol);
  }

  useEffect(_ => {
    if (autoSave && v !== value) {
      onChange(v);
    }
  }, [autoSave, value]);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, propsOtp), String(v === undefined ? placeholder : v));
});