import React, { useState, useEffect } from 'react';
import { Upload, Icon, Modal } from 'antd';
import { get } from 'zero-element/lib/utils/request/endpoint';
import { getToken } from 'zero-element/lib/utils/request/token';
import { formatAPI } from 'zero-element/lib/utils/format';

export default function UploadImage(props) {
  const { value, options, namespace, ...rest } = props;
  const { API = '/api/upload/files', max = 9 } = options;
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const fAPI = formatAPI(API, {
    namespace,
  });

  useEffect(_ => {
    setFileList(format(value));
  }, [value]);

  function handlePreview(file) {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  }
  function handleCancel() {
    setPreviewVisible(false);
  }
  const uploadButton = (
    <div>
      <Icon type={loading ? 'loading' : 'plus'} />
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
      setLoading(false);

      const doneImageList = fileList.filter(file => file.status === 'done');
      const saveimageList = doneImageList.map(file => ({ url: file.response ? file.response.data.url : file.url }));
      props.onChange(saveimageList);
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

  return <div className="clearfix" style={{ marginTop: '0.5em' }} {...rest}>
    <Upload
      {...uploadProps}
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
    // rst.push(value);
  }
  rst.length > 0 && rst.map((item, index) => {
    rst[index] = {
      ...item,
      uid: index,
      status: 'done',
    }
  });
  return rst;
}