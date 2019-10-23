import React from 'react';
import { Button } from 'antd';
import './index.css';
import { query, post } from 'zero-element/lib/utils/request';

export default function ExportExcel(props) {
  const { title = '导出', options, namespace, handle, ...restProps } = props;
  const {
    icon = 'download',
    url,
    API,
    ...rest
  } = options;

  if (!url) {
    console.warn('import-excel 缺少必要的 options : url');
  }

  function handleClick() {
    query(url)
      .then(response => {
        const { status, data } = response;
        if (status === 200) {
          post(API, data)
        }
      })
  }

  return <Button
    className="ZEle-action-button"
    onClick={handleClick}
    icon={icon}
  >
    {title}
  </Button>
}