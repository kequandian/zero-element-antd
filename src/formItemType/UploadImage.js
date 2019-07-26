import React, { useState } from 'react';
import { Upload, Icon, Modal } from 'antd';
import { get } from 'zero-element/lib/utils/request/endpoint';
import { getToken } from 'zero-element/lib/utils/request/token';

export default function UploadImage(props) {
  const { value, options } = props;
  const { API = '/api/upload/files', max = 9 } = options;
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);

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
    action: `${get()}${API}`,
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

// export default class UploadImage extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       previewVisible: false,
//       previewImage: '',
//       value: props.value,
//       fileList: format(props.value),
//       loading: false,
//     }
//   }
//   static getDerivedStateFromProps(nextProps, prevState) {
//     if (nextProps.value !== prevState.value) {
//       return {
//         value: nextProps.value,
//         reFormat: true,
//       }
//     }
//     return null;
//   }
//   componentDidUpdate(prevProps, prevState) {
//     const { reFormat, value } = this.state;
//     if (reFormat) {
//       this.setState({
//         fileList: format(value),
//         reFormat: false,
//       });
//     }
//   }

//   render() {
//     const { previewVisible, previewImage, fileList } = this.state;
//     const { options = {} } = this.props;
//     const { API = '/api/upload/files', max = 9, data } = options;
//     const formData = getPageContext().dataPool.getToFormAll();

//     const uploadProps = {
//       accept: 'image/*',
//       name: 'file',
//       action: `${getEndpoint()}${API}`,
//       listType: 'picture-card',
//       fileList: fileList,
//       showUploadList: true,
//       headers: {
//         authorization: `Bearer ${getToken()}`,
//       },
//       onPreview: this.handlePreview,
//       onChange: this.handleChange
//     }
//     if (data) {
//       const extraData = {};
//       Object.keys(data).forEach(key => {
//         extraData[data[key]] = formData[key];
//       })
//       uploadProps.data = extraData;
//     }

//     const uploadButton = (
//       <div>
//         <Icon type={this.state.loading ? 'loading' : 'plus'} />
//         <div className="ant-upload-text">点击上传</div>
//       </div>
//     );

//     return (
//       <div className="clearfix" style={{ marginTop: '0.5em' }}>
//         <Upload
//           {...uploadProps}
//         >
//           {fileList.length >= max ? '' : uploadButton}
//         </Upload>
//         <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
//           <img alt="image" style={{ width: '100%' }} src={previewImage} />
//         </Modal>
//       </div>
//     )
//   }
// }