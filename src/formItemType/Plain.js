import React from 'react';
import { formatAPI } from 'zero-element/lib/utils/format';

export default (props) => {
  const { namespace, props: propsOtp, value, defaultValue, options, ...rest } = props;
  const { format, placeholder = '-' } = options;

  let v = value || defaultValue;
  if (format) {
    v = formatAPI(format, { namespace, placeholder });
  }

  return <div {...rest}{...propsOtp}>{v}</div>;
}