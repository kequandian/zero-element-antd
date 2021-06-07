function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { Avatar, Upload } from "antd";
import React, { useState, useEffect } from 'react';
import { formatAPI } from 'zero-element/lib/utils/format';
import { getToken, setAvatar } from 'zero-element/lib/utils/request/token';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import { AvatarSvg } from "./svg";
import "./Avatars.less";
const initFileList = [];
const endpoint = getEndpoint();
export default function Avatars(props) {
  const {
    value = AvaVal,
    options,
    handle,
    namespace,
    props: restProps
  } = props;
  const [AvaVal, setAvaVal] = useState(isString(value));
  const [change, setChange] = useState(false);

  function isString(val) {
    if (typeof val === "string") {
      return endpoint + val;
    } else {
      return endpoint + val;
    }
  }

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
  const uploadProps = {
    name: 'file',
    action: /^http(s)*:\/\//.test(API) ? fAPI : `${getEndpoint()}${fAPI}`,
    fileList: fileList,
    showUploadList: false,
    headers: {
      authorization: `Bearer ${getToken()}`
    },
    onChange: handleChange
  };

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

      if (info.file.status === 'error') {
        message.error(`文件 ${info.file.name} 上传失败`);
      }

      const doneFileList = fileList.filter(file => file.status === 'done');
      const saveFileList = doneFileList.map(file => ({
        name: getValue(file, 'originalFileName', 'name'),
        url: getValue(file, 'url'),
        fileName: getValue(file, 'originalFileName', 'name'),
        fileUrl: getValue(file, 'url')
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

  function handleClick() {
    const AvaAPI = `${endpoint}/api/crud/avatar/avatar`;
    const token = getToken();
    fetch(AvaAPI, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": `Bearer ${token}`
      },
      method: "POST"
    }).then(res => {
      let json = res.json(); // console.log(json);

      Promise.resolve(json).then(val => {
        if (val.code === 200) {
          let avavals = endpoint + val.data.avatar;
          setAvaVal(avavals);
          onSaveOtherValue("avatar", val.data.avatar);

          if (change === false) {
            setFileList(format(val.data.avatar));
            setChange(true);
          }

          return AvaVal;
        } else {
          console.error("错误");
        }
      });
    }).catch(err => {
      console.log(err);
    });
  }

  useEffect(_ => {
    if (fileList === initFileList) {
      setFileList(format(AvaVal));
    }

    setAvaVal(isString(value));
  }, [fileList, value]);
  console.log(fileList);
  return /*#__PURE__*/React.createElement("div", {
    className: "User_Avatar"
  }, /*#__PURE__*/React.createElement(Upload, _extends({}, uploadProps, restProps, {
    maxCount: 1
  }), /*#__PURE__*/React.createElement(Avatar, {
    style: {
      width: 150,
      height: 150
    },
    src: AvaVal ? AvaVal : null,
    onChange: handleChange
  })), /*#__PURE__*/React.createElement("div", {
    className: "userselect",
    onClick: handleClick
  }, /*#__PURE__*/React.createElement(AvatarSvg, null)));
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
      url: endpoint + value
    });
  }

  rst.length > 0 && rst.map((item, index) => {
    rst[index] = { ...item,
      name: item.name || item.fileName || item.url,
      url: item.url || item.fileUrl || undefined,
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