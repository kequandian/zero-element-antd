import React, { useRef } from 'react';
import ZEle from 'zero-element';

export default function TableSelectWrapped(props) {
  const {
    value,
    options, namespace,
    onChange,
    data,
    extraData,
    columns,
    ...restProps
  } = props;

  const config = useRef(
    JSON.parse(JSON.stringify(configTemplate))
  );

  const {
    API, fields,
    searchFields,
    searchCol = 3,
    mountFetch,
    defaultExpand,
  } = options;

  if (Array.isArray(searchFields)) {
    config.current.items[0].config.fields = searchFields;
    config.current.items[0].config.layoutConfig = {
      value: new Array(searchCol).fill(~~24 / searchCol),
      collapse: searchCol - 1,
      defaultExpand,
    };
  } else if (searchFields === false) {
    config.current.items[0] = { layout: 'Empty', component: 'Empty' };
  }

  // ====== 优化代码 ======
   //替换小括号内容
  function formatParams(value, data){
    if(value.indexOf('(') === -1){
      return
    }
    let regex = /\((.*?)\)/g; //匹配<*> 大括号里面任意内容的正则
    let arr = value.match(regex); //字符串匹配出来的数组
    let formatString = value
    arr.map(item => {
      const str = item.substring(1, item.length - 1)
      let v = data[str]
      if(data[str] === null || data[str] === undefined){
        v = '-'
      }
      formatString = formatString.replace(`${item}`, data[str])
    })
    return formatString
  }

  let newApi = API;
  if(newApi && newApi.indexOf('(') != -1){
    newApi = formatParams(API, extraData);
  }
  // ======================

  config.current.items[1].config.API = { listAPI: newApi };
  config.current.items[1].config.fields = fields;

  return <ZEle
    MODAL={true}
    {...restProps}
    data={data}
    columns={columns}
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