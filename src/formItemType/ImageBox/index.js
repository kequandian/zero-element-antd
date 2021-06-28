import React, { useState, useEffect } from 'react';
import { Upload, Modal, message } from 'antd';
import { get } from 'zero-element/lib/utils/request/endpoint';
import { getToken } from 'zero-element/lib/utils/request/token';
import { formatAPI } from 'zero-element/lib/utils/format';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
import { AddSvg } from './svg';
import './index.less'
const endpoint = getEndpoint()

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
    console.log(fileList[0])
  }, [fileList, value]);

  function handlePreview(file) {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  }
  function handleCancel() {
    setPreviewVisible(false);
  }
  const uploadButton = (
    <div className="Image">
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      {/* <div className="ant-upload-text">点击上传</div> */}
      <div className="ImageBox" style={{width: "auto",minWidth:"200px",minHeight:"100px",height: "auto"}}>
        <div className="ImageBox_add"></div>
        <div className="icon_add"><AddSvg/></div>
            {fileList[0]?<img alt="image"  style={{ maxWidth: '200px',maxHeight:"100px",position:"relative",left:"50%",transform:"translate(-50%)"}} src={ishttp(fileList[0].url)?fileList[0].url:endpoint+fileList[0].url} />:<div style={{width:"100%",height:"100%",position: "relative",left: "95px",top: "40px"}}><LoadingOutlined /></div>}
      </div>
    </div>
  );

function ishttp(val){
    if(val){
        if(val.indexOf("https")===-1){
            return false
        }else{
            console.log("true")
            return true
        }
    }
}

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
        setFileList(saveimageList)
      } else {
        props.onChange(saveimageList.map(i => i.url).join(';'));
        setFileList(saveimageList)
      }
    }
  }

  const uploadProps = {
    // accept: 'image/*',
    name: 'file',
    action: /^http(s)*:\/\//.test(API) ? fAPI : `${get()}${fAPI}`,
    // listType: 'picture-card',
    fileList: fileList,
    showUploadList: false,
    maxCount:1,
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
    {/* <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
      <img alt="image" style={{ width: '100%' }} src={previewImage} />
    </Modal> */}
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
      console.log(value)
      if(value.indexOf("http"||"https")!==-1){
        rst.push({
            name: '图片',
            url: value,
          });         
    }else{
        rst.push({
            name: '图片',
            url: endpoint+value,
          });
    }

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