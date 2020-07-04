import React, { useRef } from 'react';
import ZEle from 'zero-element';

export default function TableSelectWrapped(props) {
  const {
    value,
    options, namespace,
    onChange,
  } = props;

  const config = useRef(
    JSON.parse(JSON.stringify(configTemplate))
  );

  const {
    API, fields,
    searchFields,
    mountFetch,
    defaultExpand,
  } = options;

  config.current.items[0].config.share = `${namespace}_tableSelect`;
  if (searchFields) {
    config.current.items[0].config.fields = searchFields;
    config.current.items[0].config.layoutConfig = {
      value: [8, 8, 8],
      collapse: 2,
      defaultExpand,
    };
  }
  config.current.items[1].config.share = `${namespace}_tableSelect`;
  config.current.items[1].config.API = { listAPI: API };
  config.current.items[1].config.fields = fields;

  return <ZEle
    MODAL={true}
    namespace={namespace}
    options={options}
    onChange={onChange}
    value={value}
    config={config.current}
    mountFetch={mountFetch}
  />
}

const configTemplate = {
  layout: 'Empty',
  items: [
    {
      layout: 'Empty',
      component: 'Search',
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