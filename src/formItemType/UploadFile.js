import React, { useState, useEffect } from 'react';
import { Upload, Button } from 'antd';
import { get } from 'zero-element/lib/utils/request/endpoint';
import { getToken } from 'zero-element/lib/utils/request/token';
import { formatAPI } from 'zero-element/lib/utils/format';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const initFileList = [];
export default function UploadFile(props) {
  const { value, options, namespace, handle, ...rest } = props;
  const {
    title = '点击上传',
    API = '/api/upload/files',
    max = 9,
    fileNameField = 'fileName'
  } = options;
  const { onSaveOtherValue } = handle;
  const [fileList, setFileList] = useState(initFileList);
  const [loading, setLoading] = useState(false);
  const fAPI = formatAPI(API, {
    namespace,
  });

  useEffect(_ => {
    if (fileList === initFileList) {
      setFileList(format(value));
    }
  }, [fileList, value]);

  const uploadButton = (
    <Button>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      {title}
    </Button>
  );

  function handleChange(info) {
    const { fileList } = info;
    setFileList(fileList);
    if (info.file.status === 'uploading' && fileList.length > 0) {
      setLoading(true);
    }
    if (info.file.status === 'done' ||
      info.file.status === 'error' ||
      info.file.status === 'removed') {
      setLoading(false);

      const doneImageList = fileList.filter(file => file.status === 'done');
      const saveFileList = doneImageList.map(file => ({
        name: file.response ? file.response.data.originalFileName : file.name,
        url: file.response ? file.response.data.url : file.url
      }));
      props.onChange(saveFileList);
      if (max === 1) {
        onSaveOtherValue(fileNameField, saveFileList[0].name);
      }
    }
  }

  const uploadProps = {
    name: 'file',
    action: /^http(s)*:\/\//.test(API) ? fAPI : `${get()}${fAPI}`,
    fileList: fileList,
    showUploadList: true,
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
    onChange: handleChange
  }

  return <div className="clearfix" style={{ marginTop: '0.5em' }} {...rest}>
    <Upload
      {...uploadProps}
    >
      {fileList.length >= max ? '' : uploadButton}
    </Upload>
  </div>
}

function format(value) {
  let rst = [];
  try {
    if (typeof (value) === 'string') {
      rst = JSON.parse(value);
    } else if (Array.isArray(value)) {
      rst = value;
    }
  } catch (e) {
    // rst.push(value);
  }
  rst.length > 0 && rst.map((item, index) => {
    rst[index] = {
      ...item,
      name: item.name || item.url,
      uid: index,
      status: 'done',
    }
  });
  return rst;
}