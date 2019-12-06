import React, { useEffect, useState } from 'react';
import { InputNumber } from 'antd';
import { Flex } from 'layout-flex';
import { toNumber } from '@/utils/tool';

const { FlexItem } = Flex;

export default function NumberRange({
  value, props, options,
  onChange,
  ...rest
}) {
  const { min = [], max = [], } = options;
  const [v, setV] = useState(value || [null, null]);

  useEffect(_ => {
    if (value === '') {
      setV([null, null]);
    }
  }, [value]);

  function handleChange(index, data) {
    if (data === null) {
      v[index] = data;
    } else {
      v[index] = toNumber(data);
    }
    setV([...v]);
    onChange(v);
  }

  return <Flex className="ZEleA-NumberRange">
    <FlexItem flex={1}>
      <InputNumber
        value={v[0]}
        min={min[0]}
        max={max[0]}
        {...rest}
        {...props}
        onChange={handleChange.bind(null, 0)}
      />
    </FlexItem>
    <span>~</span>
    <FlexItem flex={1}>
      <InputNumber
        value={v[1]}
        min={min[1]}
        max={max[1]}
        {...rest}
        {...props}
        onChange={handleChange.bind(null, 1)}
      />
    </FlexItem>
  </Flex>;
}