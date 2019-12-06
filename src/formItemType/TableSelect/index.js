import React from 'react';
import ZEle from 'zero-element';

export default function TableSelectWrapped(props) {
  const {
    value,
    options, namespace,
    onChange,
  } = props;

  const {
    API, fields,
  } = options;

  config.items[0].config.share = `${namespace}_tableSelect`;
  config.items[1].config.share = `${namespace}_tableSelect`;
  config.items[1].config.API = { listAPI: API };
  config.items[1].config.fields = fields;

  return <ZEle
    MODAL={true}
    namespace={namespace}
    options={options}
    onChange={onChange}
    value={value}
    config={config}
  />
}

const config = {
  layout: 'Empty',
  items: [
    {
      layout: 'Empty',
      component: 'BaseSearch',
      config: {
        share: '',
        layoutConfig: {
          value: [14, 10],
        },
        fields: [
          {
            label: '搜索',
            field: 'search',
            type: 'input',
            placeholder: '请输入搜索内容...',
          }
        ]
      }
    },
    {
      layout: 'Empty',
      component: 'TableSelect',
      config: {
        share: '',
        API: {
          listAPI: '',
        },
        fields: [],
      }
    }
  ]
}