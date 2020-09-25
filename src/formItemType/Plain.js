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
  const {
    placeholder = '-',
    autoSave = false,
    format, map,
    symbol = '/', joinField,
  } = options;

  let v = value;
  if (format) {
    const rst = [];

    if (Array.isArray(format)) {
      format.forEach(f => {
        rst.push(formatAPI(f, { namespace, placeholder, data: formdata }))
      })
    } else {
      rst.push(formatAPI(format, { namespace, placeholder, data: formdata }));
    }
    v = rst.join('\n');
  }
  if (map) {
    v = map[v];
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

  return <div {...rest}{...propsOtp}>{String(echoText)}</div>;
}