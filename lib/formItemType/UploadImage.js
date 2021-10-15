function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import { Upload, Modal, message } from 'antd';
import { get } from 'zero-element/lib/utils/request/endpoint';
import { getToken } from 'zero-element/lib/utils/request/token';
import { formatAPI } from 'zero-element/lib/utils/format';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
const endpoint = getEndpoint();
const initFileList = [];
export default function UploadImage(props) {
  const {
    value,
    options,
    namespace,
    props: restProps
  } = props;
  const {
    API = '/api/fs/uploadfile',
    max = 9,
    type = 'json',
    folderName
    /* 文件夹名 */

  } = options;
  const [fileList, setFileList] = useState(initFileList);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const fAPI = formatAPI(API, {
    namespace
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

  const uploadButton = /*#__PURE__*/React.createElement("div", null, loading ? /*#__PURE__*/React.createElement(LoadingOutlined, null) : /*#__PURE__*/React.createElement(PlusOutlined, null), /*#__PURE__*/React.createElement("div", {
    className: "ant-upload-text"
  }, "\u70B9\u51FB\u4E0A\u4F20"));

  function handleChange(info) {
    const {
      fileList
    } = info;
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
      const saveimageList = doneImageList.map(file => ({
        url: file.response ? file.response.data.url : file.url
      }));

      if (type === 'json') {
        props.onChange(saveimageList);
      } else {
        props.onChange(saveimageList.map(i => i.url).join(';'));
      }
    }
  }

  let Bucket = folderName ? {
    "X-FS-BUCKET": folderName
  } : {};
  let uploadProps = {
    accept: 'image/*',
    name: 'file',
    action: /^http(s)*:\/\//.test(API) ? fAPI : `${get()}${fAPI}`,
    listType: 'picture-card',
    fileList: fileList,
    showUploadList: true,
    headers: {
      authorization: `Bearer ${getToken()}`,
      ...Bucket
    },
    onPreview: handlePreview,
    onChange: handleChange
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "clearfix",
    style: {
      marginTop: '0.5em'
    }
  }, /*#__PURE__*/React.createElement(Upload, _extends({}, uploadProps, restProps), fileList.length >= max ? '' : uploadButton), /*#__PURE__*/React.createElement(Modal, {
    visible: previewVisible,
    footer: null,
    onCancel: handleCancel
  }, /*#__PURE__*/React.createElement("img", {
    alt: "image",
    style: {
      width: '100%'
    },
    src: previewImage
  })));
}

function format(value) {
  let rst = [];

  try {
    if (typeof value === 'string') {
      rst = JSON.parse(value);
    } else if (Array.isArray(value)) {
      rst = value;
    }
  } catch (e) {
    if (value.indexOf("http" || "https") !== -1) {
      rst.push({
        name: '图片',
        url: value
      });
    } else {
      rst.push({
        name: '图片',
        url: endpoint + value
      });
    }
  }

  rst.length > 0 && rst.map((item, index) => {
    rst[index] = { ...item,
      uid: String(-index),
      status: 'done'
    };
  });
  return rst;
}