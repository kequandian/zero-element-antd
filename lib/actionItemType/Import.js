import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { get } from 'zero-element/lib/utils/request/endpoint';
import { getToken } from 'zero-element/lib/utils/request/token';
import { formatAPI } from 'zero-element/lib/utils/format';
export default function Import(props) {
  const {
    title = '导入',
    options = {},
    namespace,
    handle,
    ...restProps
  } = props;
  const {
    API = '/api/io/excel/import',
    name,
    ...rest
  } = options;
  const [loading, setLoading] = useState(false);
  const fAPI = formatAPI(API, {
    namespace
  });

  function handleCloseAndQuery() {
    setLoading(false);

    if (typeof handle.onRefresh === 'function') {
      handle.onRefresh();
    }
  }

  function handleChange(info) {
    const {
      fileList
    } = info;

    if (info.file.status === 'uploading' && fileList.length > 0) {
      setLoading(true);
    }

    if (info.file.status === 'done') {
      message.success('导入成功');
      handleCloseAndQuery();
    }

    if (info.file.status === 'error') {
      message.error('导入失败');
      setLoading(false);
    }
  }

  if (!API) {
    console.warn('import 缺少必要的 options : API');
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Upload, {
    name: "multipartFile",
    action: /^http(s)*:\/\//.test(API) ? fAPI : `${get()}${fAPI}`,
    disabled: loading,
    headers: {
      authorization: `Bearer ${getToken()}`
    },
    onChange: handleChange,
    data: {
      name
    },
    showUploadList: false
  }, /*#__PURE__*/React.createElement(Button, {
    loading: loading,
    className: "ZEle-action-button",
    icon: /*#__PURE__*/React.createElement(UploadOutlined, null)
  }, title)));
}