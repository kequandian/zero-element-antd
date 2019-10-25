import React from 'react';
import { Button } from 'antd';
import { query, post } from '@/utils/request';
import './index.css';

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
      .then(data => {
        post(API, data);
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