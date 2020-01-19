import React from 'react';
import { formatAPI } from 'zero-element/lib/utils/format';

export default (props) => {
  const { name, namespace, props: propsOtp, defaultValue, value = defaultValue, options, ...rest } = props;
  const { format, placeholder = '-', map } = options;

  let v = value;
  if (format) {
    v = formatAPI(format, { namespace, placeholder });
  }
  if (map) {
    v = map[v];
  }

  return <div {...rest}{...propsOtp}>{String(v === undefined ? placeholder : v)}</div>;
}