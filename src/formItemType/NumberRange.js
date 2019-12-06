import React, { useRef } from 'react';
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
  const v = useRef(value || [null, null]);

  function handleChange(index, data) {
    if (data === null) {
      v.current[index] = data;
    } else {
      v.current[index] = toNumber(data);
    }
    onChange(v.current);
  }

  return <Flex className="ZEleA-NumberRange">
    <FlexItem flex={1}>
      <InputNumber
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
        min={min[1]}
        max={max[1]}
        {...rest}
        {...props}
        onChange={handleChange.bind(null, 1)}
      />
    </FlexItem>
  </Flex>;
}