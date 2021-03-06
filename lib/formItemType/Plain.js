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
    placeholder = '-',
    autoSave = false,
    format,
    map,
    symbol = '/',
    joinField
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
    v = map[v] || v;
  }

  if (Array.isArray(v)) {
    if (joinField) {
      v = v.map(i => i[joinField]).join(symbol);
    } else {
      v = v.join(symbol);
    }
  }

  useEffect(_ => {
    if (autoSave && v !== value) {
      onChange(v);
    }
  }, [autoSave, value]);
  let echoText = v;

  if (!v && v !== 0) {
    echoText = placeholder;
  }

  return /*#__PURE__*/React.createElement("div", _extends({}, rest, propsOtp), String(echoText));
});