import React from 'react';
import { Space } from 'antd';
import { Render } from 'zero-element/lib/config/valueType';
import _ from 'lodash';

/**
 * 2021-7-13
 * @param {size} 间距属性 'small' | 'middle' | 'large' | number
 */

export default function valueTypeComplex(props) {
  const { options, handle, data: { index, record }, } = props;
  const { fields, direction = 'horizontal', size = 'small' } = options;

  return <Space direction={direction} size={size} >{fields.map((field, i) => {
    const { type } = field;
    return <Render
      key={field.field}
      n={type}
      {...field}
      {...props}
      data={{
        text: _.get(record, field.field),
        record,
        index,
        type,
      }}
      handle={handle}
      options={fields[i] && fields[i].options || {}}
    />
  })}</Space>
}