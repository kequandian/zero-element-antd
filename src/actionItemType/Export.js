import React, { useState } from 'react';
import { Button } from 'antd';
import { download } from 'zero-element/lib/utils/request';
import { getPageData } from 'zero-element/lib/Model';
import { get } from 'zero-element/lib/utils/request/endpoint';
import { DownloadOutlined } from '@ant-design/icons';
import { formatAPI } from 'zero-element/lib/utils/format';
import qs from 'querystring';

export default function Export(props) {
  const { title = '导出', options = {}, className, namespace, handle, config, ...restProps } = props;
  const {
    API = '/api/io/excel/export/<name>',
    method = 'post',
    name = namespace,
    fileName,
    type = 'API',
    ...rest
  } = options;
  const { API: lAPI = {} } = config;
  const { listAPI } = lAPI;
  const pageData = getPageData(namespace);
  const { searchData, current, total } = pageData;
  const [loading, setLoading] = useState(false);

  function handleClick() {
    const { pageNum, pageSize, ...rest } = searchData;
    setLoading(true);
    const fAPI = formatAPI(API, {
      namespace,
      data: {
        name,
      }
    });

    download(fAPI, {
      method,
      fileName,
    }, {
      exportName: name,
      search: searchData,
      type,
      api: `${get()}${listAPI}?pageNum=${current}&pageSize=${total}&${qs.stringify(rest)}`,
    })
      .finally(_ => {
        setLoading(false);
      })
  }

  return <Button
    className={className}
    onClick={handleClick}
    loading={loading}
    icon={<DownloadOutlined />}
  >
    {title}
  </Button>
}