import React from 'react';
import { Button } from 'antd';
import { download } from 'zero-element/lib/utils/request';
import { getPageData } from 'zero-element/lib/Model';
import { get } from 'zero-element/lib/utils/request/endpoint';
import { DownloadOutlined } from '@ant-design/icons';

export default function Export(props) {
  const { title = '导出', options = {}, className, namespace, handle, config, ...restProps } = props;
  const {
    API = '/api/io/excel/export',
    method,
    name = namespace,
    fileName,
    ...rest
  } = options;
  const { API: lAPI = {} } = config;
  const { listAPI } = lAPI;
  const pageData = getPageData(namespace);
  const { searchData, current, total } = pageData;

  function handleClick() {

    download(API, {
      method,
      fileName,
    }, {
      exportName: name,
      search: searchData,
      type: 'API',
      api: `${get()}${listAPI}?pageNum=${current}&pageSize=${total}`,
    });
  }

  return <Button
    className={className}
    onClick={handleClick}
    icon={<DownloadOutlined />}
  >
    {title}
  </Button>
}