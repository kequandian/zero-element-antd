import React from 'react';
import { Button } from 'antd';
import { Render } from 'zero-element/lib/config/valueType';

export default (props) => {
  const { namespace, data: { text = '', index, record }, options = {} } = props;
  const { fileName = '下载' } = options;

  if (Array.isArray(text)) {
    return text.map((item, i) => {
      return <Button type="link" size="small" key={item.id || i} href={item.url} >
        <Render
          n="ellipsis"
          namespace={namespace}
          data={{
            text: item.name,
            record,
            index,
          }}
          options={{}}
          handle={{}}
        />
      </Button>
    })
  }

  if (text) {
    return <Button type="link" size="small" href={text} >
      <Render
        n="ellipsis"
        namespace={namespace}
        data={{
          text: record[fileName] || fileName,
          record,
          index,
        }}
        options={{}}
        handle={{}}
      />
    </Button>;
  }

  return '-';
}