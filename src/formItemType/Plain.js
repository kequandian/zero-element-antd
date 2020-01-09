import React from 'react';
import { formatAPI } from 'zero-element/lib/utils/format';

export default (props) => {
  const { namespace, props: propsOtp, value, defaultValue, options, ...rest } = props;
  const { format, placeholder = '-', map } = options;

  let v = value || defaultValue;
  if (format) {
    v = formatAPI(format, { namespace, placeholder });
  }
  if (map) {
    v = map[v];
  }

  return <div {...rest}{...propsOtp}>{String(v || placeholder)}</div>;
}