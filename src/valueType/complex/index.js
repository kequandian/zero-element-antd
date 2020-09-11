import React from 'react';
import { Render } from 'zero-element/lib/config/valueType';
import _ from 'lodash';

export default function valueTypeComplex(props) {
  const { options, handle, data: { index, record }, } = props;
  const { fields } = options;

  return <span>{fields.map(field => {
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
    />
  })}</span>
}