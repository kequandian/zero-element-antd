import React, { useEffect } from 'react';
import { formatAPI } from 'zero-element/lib/utils/format';

export default (props) => {
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
  const { format, placeholder = '-', map } = options;

  let v = value;
  if (format) {
    v = formatAPI(format, { namespace, placeholder, data: formdata });
  }
  if (map) {
    v = map[v];
  }

  useEffect(_ => {
    if (v !== value) {
      onChange(v);
    }
  }, [value]);

  return <div {...rest}{...propsOtp}>{String(v === undefined ? placeholder : v)}</div>;
}