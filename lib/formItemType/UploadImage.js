"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = UploadImage;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("antd/lib/modal/style/css");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

require("antd/lib/upload/style/css");

var _upload = _interopRequireDefault(require("antd/lib/upload"));

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _endpoint = require("zero-element/lib/utils/request/endpoint");

var _token = require("zero-element/lib/utils/request/token");

function UploadImage(props) {
  var value = props.value,
      options = props.options;
  var _options$API = options.API,
      API = _options$API === void 0 ? '/api/upload/files' : _options$API,
      _options$max = options.max,
      max = _options$max === void 0 ? 9 : _options$max;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      fileList = _useState2[0],
      setFileList = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      previewVisible = _useState4[0],
      setPreviewVisible = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      previewImage = _useState6[0],
      setPreviewImage = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      loading = _useState8[0],
      setLoading = _useState8[1];

  useEffect(function (_) {
    setFileList(format(value));
  }, [value]);

  function handlePreview(file) {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  }

  function handleCancel() {
    setPreviewVisible(false);
  }

  var uploadButton = _react["default"].createElement("div", null, _react["default"].createElement(_icon["default"], {
    type: loading ? 'loading' : 'plus'
  }), _react["default"].createElement("div", {
    className: "ant-upload-text"
  }, "\u70B9\u51FB\u4E0A\u4F20"));

  function handleChange(info) {
    var fileList = info.fileList;
    setFileList(fileList);

    if (info.file.status === 'uploading' && fileList.length > 0) {
      setLoading(true);
    }

    if (info.file.status === 'done' || info.file.status === 'error' || info.file.status === 'removed') {
      setLoading(false);
      var doneImageList = fileList.filter(function (file) {
        return file.status === 'done';
      });
      var saveimageList = doneImageList.map(function (file) {
        return {
          url: file.response ? file.response.data.url : file.url
        };
      });
      props.onChange(saveimageList);
    }
  }

  var uploadProps = {
    accept: 'image/*',
    name: 'file',
    action: "".concat((0, _endpoint.get)()).concat(API),
    listType: 'picture-card',
    fileList: fileList,
    showUploadList: true,
    headers: {
      authorization: "Bearer ".concat((0, _token.getToken)())
    },
    onPreview: handlePreview,
    onChange: handleChange
  };
  return _react["default"].createElement("div", {
    className: "clearfix",
    style: {
      marginTop: '0.5em'
    }
  }, _react["default"].createElement(_upload["default"], uploadProps, fileList.length >= max ? '' : uploadButton), _react["default"].createElement(_modal["default"], {
    visible: previewVisible,
    footer: null,
    onCancel: handleCancel
  }, _react["default"].createElement("img", {
    alt: "image",
    style: {
      width: '100%'
    },
    src: previewImage
  })));
}

function format(value) {
  var rst = [];

  try {
    if (typeof value === 'string') {
      rst = JSON.parse(value);
    } else if (Array.isArray(value)) {
      rst = value;
    }
  } catch (e) {// rst.push(value);
  }

  rst.length > 0 && rst.map(function (item, index) {
    rst[index] = (0, _objectSpread2["default"])({}, item, {
      uid: index,
      status: 'done'
    });
  });
  return rst;
} // export default class UploadImage extends PureComponent {
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