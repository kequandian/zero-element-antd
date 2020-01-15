import React from 'react';
import { Button } from 'antd';
import request, { error } from 'zero-element/lib/utils/request/axios';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import { getToken } from 'zero-element/lib/utils/request/token';
import './index.css';
import { useModel } from 'zero-element/lib/Model';
import qs from 'qs';

export default function ExportExcel(props) {
  const { title = '导出', options, namespace, handle, ...restProps } = props;
  const {
    icon = 'download',
    API,
    ...rest
  } = options;
  const [state] = useModel({ namespace });
  const { searchData } = state;

  function handleClick() {
    download(API, searchData);
  }

  return <Button
    className="ZEle-action-button"
    onClick={handleClick}
    icon={icon}
  >
    {title}
  </Button>
}

function canEndPoint(api) {
  return api.indexOf('http') === -1 ? getEndpoint() : undefined
}


async function download(api, params) {
  return request({
    url: api,
    method: 'get',
    baseURL: canEndPoint(api),
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
    responseType: 'blob',
    headers: {
      'Authorization': "Bearer " + getToken(),
    },
    params,
  })
    .then(res => downloadFile(res))
    .catch(error);
}

function downloadFile(res, defaultName = 'file') {
  if (res.data.type === "application/json") {
    return Promise.reject('api 未返回文件数据流');
  } else {

    const disposition = res.headers['content-disposition'] || '';
    const matchRst = disposition.match(/filename=(\S+)/i);
    const fileName = matchRst && matchRst[1] || defaultName;

    const blob = new Blob([res.data]);
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName); //兼容ie10
    } else {
      const link = document.createElement("a");
      const evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", false, false);
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(link.href);
    }
  }
}