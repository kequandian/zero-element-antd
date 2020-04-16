import React from 'react';
import { Button } from 'antd';
import { download } from 'zero-element/lib/utils/request';
import { useModel } from 'zero-element/lib/Model';
import { get } from 'zero-element/lib/utils/request/endpoint';
import './index.css';

export default function ExportExcel(props) {
  const { title = '导出', options, namespace, handle, config, ...restProps } = props;
  const {
    icon = 'download',
    API,
    method,
    name = namespace,
    fileName,
    ...rest
  } = options;
  const { API: lAPI = {} } = config;
  const { listAPI } = lAPI;
  const [state] = useModel({ namespace });
  const { searchData, listData } = state;

  function handleClick() {

    download(API, {
      method,
      fileName,
    }, {
      ...searchData,
      templateName: name,
      api: `${get()}${listAPI}?pageNum=${listData.current}&pageSize=${listData.total}`,
    });
  }

  return <Button
    className="ZEle-action-button"
    onClick={handleClick}
    icon={icon}
  >
    {title}
  </Button>
}