import React, { useState, useEffect } from 'react';
import { Upload, Modal, message } from 'antd';
import { get } from 'zero-element/lib/utils/request/endpoint';
import { getToken } from 'zero-element/lib/utils/request/token';
import { formatAPI } from 'zero-element/lib/utils/format';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const initFileList = [];
export default function UploadImage(props) {
  const { value, options, namespace, props: restProps } = props;
  const { API = '/api/fs/uploadfile', max = 9, type = 'json' } = options;
  const [fileList, setFileList] = useState(initFileList);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const fAPI = formatAPI(API, {
    namespace,
  });

  useEffect(_ => {
    if (fileList === initFileList) {
      setFileList(format(value));
    }
  }, [fileList, value]);

  function handlePreview(file) {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  }
  function handleCancel() {
    setPreviewVisible(false);
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">点击上传</div>
    </div>
  );

  function handleChange(info) {
    const { fileList } = info;
    setFileList(fileList);
    if (info.file.status === 'uploading' && fileList.length > 0) {
      setLoading(true);
    }
    if (info.file.status === 'done' || info.file.status === 'error' || info.file.status === 'removed') {
      if (info.file.status === 'error') {
        message.error(`图片 ${info.file.name} 上传失败`);
      }

      setLoading(false);

      const doneImageList = fileList.filter(file => file.status === 'done');
      const saveimageList = doneImageList.map(file => ({ url: file.response ? file.response.data.url : file.url }));
      if (type === 'json') {
        props.onChange(saveimageList);
      } else {
        props.onChange(saveimageList.map(i => i.url).join(';'));
      }
    }
  }

  const uploadProps = {
    accept: 'image/*',
    name: 'file',
    action: /^http(s)*:\/\//.test(API) ? fAPI : `${get()}${fAPI}`,
    listType: 'picture-card',
    fileList: fileList,
    showUploadList: true,
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
    onPreview: handlePreview,
    onChange: handleChange
  }

  return <div className="clearfix" style={{ marginTop: '0.5em' }}>
    <Upload
      {...uploadProps}
      {...restProps}
    >
      {fileList.length >= max ? '' : uploadButton}
    </Upload>
    <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
      <img alt="image" style={{ width: '100%' }} src={previewImage} />
    </Modal>
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
    rst.push({
      name: '图片',
      url: value,
    });
  }
  rst.length > 0 && rst.map((item, index) => {
    rst[index] = {
      ...item,
      uid: String(-index),
      status: 'done',
    }
  });
  return rst;
}