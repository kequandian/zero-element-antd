import React from 'react';
import { Button } from 'antd';
import { Render } from 'zero-element/lib/config/valueType';

export default function valueTypeUrl(props) {
  const { namespace, data: { text, record, index }, } = props;

  return <Button type="link" size="small" href={text}>
    <Render
      n="ellipsis"
      namespace={namespace}
      data={{
        text: text,
        record,
        index,
      }}
      options={{}}
      handle={{}}
    /></Button>
}