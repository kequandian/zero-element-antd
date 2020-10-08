function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import { Upload, Button } from 'antd';
import { get } from 'zero-element/lib/utils/request/endpoint';
import { getToken } from 'zero-element/lib/utils/request/token';
import { formatAPI } from 'zero-element/lib/utils/format';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
const {
  Dragger
} = Upload;
const initFileList = [];
export default function UploadFile(props) {
  const {
    value,
    options,
    namespace,
    handle,
    props: restProps
  } = props;
  const {
    title = '点击上传',
    API = '/api/fs/uploadfile',
    max = 9,
    fileNameField = 'fileName',
    type = 'json',
    dragger = false
  } = options;
  const {
    onSaveOtherValue
  } = handle;
  const [fileList, setFileList] = useState(initFileList);
  const [loading, setLoading] = useState(false);
  const fAPI = formatAPI(API, {
    namespace
  });
  useEffect(_ => {
    if (fileList === initFileList) {
      setFileList(format(value));
    }
  }, [fileList, value]);
  const uploadButton = /*#__PURE__*/React.createElement(Button, null, loading ? /*#__PURE__*/React.createElement(LoadingOutlined, null) : /*#__PURE__*/React.createElement(PlusOutlined, null), title);

  function handleChange(info) {
    const {
      fileList
    } = info;
    setFileList(fileList.map(file => ({ ...file,
      name: getValue(file, 'originalFileName', 'name'),
      url: getValue(file, 'url')
    })));

    if (info.file.status === 'uploading' && fileList.length > 0) {
      setLoading(true);
    }

    if (info.file.status === 'done' || info.file.status === 'error' || info.file.status === 'removed') {
      setLoading(false);
      const doneFileList = fileList.filter(file => file.status === 'done');
      const saveFileList = doneFileList.map(file => ({
        name: getValue(file, 'originalFileName', 'name'),
        url: getValue(file, 'url')
      }));

      if (type === 'json') {
        props.onChange(saveFileList);
      } else {
        props.onChange(saveFileList.map(i => i.url).join(';'));
      }

      if (max === 1) {
        if (saveFileList[0]) {
          onSaveOtherValue(fileNameField, saveFileList[0].name);
        } else {
          onSaveOtherValue(fileNameField, '');
        }
      }
    }
  }

  const uploadProps = {
    name: 'file',
    action: /^http(s)*:\/\//.test(API) ? fAPI : `${get()}${fAPI}`,
    fileList: fileList,
    showUploadList: true,
    headers: {
      authorization: `Bearer ${getToken()}`
    },
    onChange: handleChange
  };
  const limit = fileList.length >= max;
  return /*#__PURE__*/React.createElement("div", {
    className: "clearfix"
  }, dragger ? /*#__PURE__*/React.createElement(Dragger, _extends({}, uploadProps, restProps, {
    className: limit ? 'ZEleA-UploadFile-hidden' : ''
  }), /*#__PURE__*/React.createElement("p", {
    className: "ant-upload-drag-icon"
  }, /*#__PURE__*/React.createElement(UploadOutlined, null)), /*#__PURE__*/React.createElement("p", {
    className: "ant-upload-text"
  }, "\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u4EE5\u4E0A\u4F20")) : /*#__PURE__*/React.createElement(Upload, _extends({}, uploadProps, restProps), limit ? '' : uploadButton));
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
    rst.push({
      name: '文件',
      url: value
    });
  }

  rst.length > 0 && rst.map((item, index) => {
    rst[index] = { ...item,
      name: item.name || item.url,
      uid: String(-index),
      status: 'done'
    };
  });
  return rst;
}

function getValue(obj, key, spareKey) {
  if (!obj) return undefined;

  if (obj.response) {
    if (obj.response.data && obj.response.data[key]) {
      return obj.response.data[key];
    }

    if (obj.response.data && obj.response.data[spareKey]) {
      return obj.response.data[spareKey];
    }
  }

  if (obj[key]) {
    return obj[key];
  }

  if (obj[spareKey]) {
    return obj[spareKey];
  }

  return undefined;
}