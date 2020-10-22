import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { message } from 'antd';
import { get } from 'zero-element/lib/utils/request/endpoint';
import { getToken } from 'zero-element/lib/utils/request/token';
import { UploadOutlined } from '@ant-design/icons';
import { formatAPI } from 'zero-element/lib/utils/format';

export default function DirectUpload(props) {
  const { name, namespace, options = {} } = props;
  const { title, API, } = options;
  const [loading, setLoading] = useState(false);

  function handleChange(info) {
    const { fileList } = info;
    if (info.file.status === 'uploading' && fileList.length > 0) {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      message.success('导入成功');
      handleCloseAndQuery();
      setLoading(false);
    }
    if (info.file.status === 'error') {
      message.error('导入失败');
      setLoading(false);
    }
  }

  function handleCloseAndQuery() {
    setLoading(false);
  }

  const fAPI = formatAPI(API, {
    namespace,
  });

  return <Upload
    name={name}
    action={/^http(s)*:\/\//.test(API) ? fAPI : `${get()}${fAPI}`}
    disabled={loading}
    headers={{
      authorization: `Bearer ${getToken()}`,
    }}
    onChange={handleChange}
    showUploadList={false}
  >
    <Button
      loading={loading}
      icon={<UploadOutlined />}
    >
      {title}
    </Button>
  </Upload>;
}