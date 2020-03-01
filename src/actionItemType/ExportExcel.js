import React from 'react';
import { Button } from 'antd';
import { download } from 'zero-element/lib/utils/request';
import { useModel } from 'zero-element/lib/Model';
import './index.css';

export default function ExportExcel(props) {
  const { title = '导出', options, namespace, handle, ...restProps } = props;
  const {
    icon = 'download',
    API,
    method,
    fileName,
    ...rest
  } = options;
  const [state] = useModel({ namespace });
  const { searchData } = state;

  function handleClick() {
    download(API, {
      method,
      fileName,
    }, searchData);
  }

  return <Button
    className="ZEle-action-button"
    onClick={handleClick}
    icon={icon}
  >
    {title}
  </Button>
}