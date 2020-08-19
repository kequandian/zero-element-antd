import React, { useRef } from 'react';
import { Input } from 'antd';
import { useWillMount } from 'zero-element/lib/utils/hooks/lifeCycle';

const { Password } = Input;

export default ({ name, props, value, options, onChange, handle, ...rest }) => {
  const initValue = useRef();
  const { notUpdateSubmitNull } = options;
  const { onFormatValue } = handle;

  useWillMount(_ => {
    initValue.current = value;
    if (notUpdateSubmitNull) {
      onFormatValue(name, 'toValue');
      onChange({ _toValue: undefined });
    }
  });

  function handleChange(e) {
    const v = e.target.value;
    if (notUpdateSubmitNull) {
      onChange({
        _toValue: v,
      });
    } else {
      onChange(v);
    }
  }

  return <Password {...props} defaultValue={initValue.current} onChange={handleChange} />;
}