// /*
// * @Description: 公共上传图片
//  * @param {Array} type 图片格式。默认类型为png，jpeg
//  * @param {Number} size 图片限制大小 默认大小为8M
//  * @param {String} errorTypeMsg 图片格式错误文字提示
//  * @param {String} errorTypeMsg 图片大小错误文字提示
//  * @param {Function} handleFetchUrl 选中图片后回调函数
//  * @param {String} uploadUrl 上传图片请求的url，默认为admin/fileUpload
//  * @param {String} iconText 按钮文字
//  * @param {Object} style 样式
//  * @param {String} value 当前图片地址

//  */
// import React, { Component } from 'react';
// import { Tooltip, Upload, Icon, message, Modal, Divider, Spin } from 'antd';
// import styles from './index.less';
// import { fileUpload } from '@/services/common/upload';

// export default class UploadImage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       visible: false,
//       shadow: false,
//       loading: false,
//     };
//   }

//   componentWillMount() {
//     this.props.onRef && this.props.onRef(this);
//   }

//   /**
//    * @description: 上传前格式大小等校验
//    */
//   beforeUpload = (file) => {
//     /**
//      * @description: 父组件传入的参数
//      * @param {Array} type 图片格式。默认类型为png，jpeg
//      * @param {Number} size 图片限制大小 默认大小为8M
//      * @param {String} errorTypeMsg 图片格式错误文字提示
//      * @param {String} errorSizeMsg 图片大小错误文字提示
//      * @param {Function} checkSize 文件大小校验方式
//      */
//     let {
//       type = ['image/jpeg', 'image/png', 'image/gif'],
//       size,
//       errorTypeMsg,
//       errorSizeMsg,
//       checkSize,
//     } = this.props;
//     size ? (size = size) : (size = 8);
//     if (checkSize) {
//       size = checkSize(file.type);
//     }
//     const isJpgOrPng = type.includes(file.type);
//     if (!isJpgOrPng) {
//       message.error(
//         errorTypeMsg || '图片/视频格式错误！请上传jpeg/png/gif格式图片或avi/mp4格式视频'
//       );
//     }
//     const isLt8M = file.size < size * 1024 * 1024;
//     if (!isLt8M) {
//       message.error(errorSizeMsg || '图片/视频大小限制' + size + 'M!');
//     }
//     return isJpgOrPng && isLt8M;
//   };

//   handleUpload = ({ file }) => {
//     /**
//      * @description:
//      * @param {Function} handleFetchUrl 选中图片后回调函数
//      * @param {String} uploadUrl 上传图片请求的url，默认为admin/fileUpload
//      */
//     const { dispatch, uploadUrl, handleFetchUrl } = this.props;
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('fileCode', 'PIC');
//     this.setState({ loading: true });
//     const upload = async (record) => {
//       let upUrl = uploadUrl || fileUpload;
//       try {
//         const response = await upUrl(formData);
//         if (response.returnCode === 0) {
//           if (handleFetchUrl && typeof handleFetchUrl === 'function') {
//             handleFetchUrl(response.data, file.type);
//           }
//           message.success('上传成功');
//           //上传成功的回调
//           this.props.handleUploadImage && this.props.handleUploadImage();
//         }
//         this.setState({ loading: false });
//       } catch (error) {
//         console.log(error, 'error');
//         this.setState({ loading: false });
//       }
//     };
//     upload();
//     // dispatch({
//     //   type: uploadUrl || 'admin/fileUpload',
//     //   payload: formData,
//     //   callback: (response) => {
//     //     if (response.returnCode === 0) {
//     //       if (handleFetchUrl && typeof handleFetchUrl === 'function') {
//     //         handleFetchUrl(response.data, file.type);
//     //       }
//     //       message.success('上传成功');
//     //     }
//     //   },
//     // });
//   };

//   /**
//    * @description: 改变visible
//    * @param {*}
//    */
//   handleSetVisible = (val, event) => {
//     this.setState({
//       visible: val,
//     });
//     if (event) {
//       event.stopPropagation();
//     }
//   };

//   /**
//    * @description: 改变image上的阴影显示
//    */
//   setShadow = (val) => {
//     this.setState({
//       shadow: val,
//     });
//   };

//   /**
//    * @description: 删除图片
//    */
//   handleDeleteImg = (event) => {
//     const { dispatch, uploadUrl, handleFetchUrl } = this.props;
//     handleFetchUrl('');
//     if (event) {
//       //函数删除的回调
//       this.props.onHandleDelete && this.props.onHandleDelete();
//       event.stopPropagation();
//     }
//   };

//   render() {
//     /**
//      * @description:
//      * @param {String} iconText 按钮文字
//      * @param {Object} style 样式
//      * @param {String} value 内容
//      * @param {String} fileType 文件类型  img/video
//      * @param {String} backgroundImg 背景图，如果是video，缩略图中显示背景图，弹窗大图中显示video
//      * @param {String} showDelete 是否显示删除按钮，showDelete=delete 不显示
//      * @param {Number} size 图片大小单位M,默认8
//      */
//     const {
//       iconText,
//       style,
//       value,
//       fileType,
//       backgroundImg,
//       disabled,
//       infoText,
//       showDelete,
//       size,
//       errorSizeMsg,
//       errorTypeMsg,
//     } = this.props;
//     console.log(iconText)
//     const { visible, shadow, loading } = this.state;
//     return (
//       <div className={styles.ContentBox}>
//         <Spin spinning={loading}>
//           <Upload
//             listType="picture-card"
//             showUploadList={false}
//             customRequest={this.handleUpload}
//             beforeUpload={this.beforeUpload}
//             disabled={disabled}
//           >
//             {value ? (
//               <div
//                 className={styles.imgContent}
//                 style={{
//                   width: 150,
//                   height: 150,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   ...style,
//                 }}
//                 onMouseOver={() => this.setShadow(true)}
//                 onMouseLeave={() => this.setShadow(false)}
//               >
//                 {(fileType === 'img' || !fileType) && (
//                   <img
//                     alt={iconText}
//                     src={value}
//                     style={{
//                       maxWidth: (style && style.width && style.width) || 150,
//                       maxHeight: (style && style.height && style.height) || 150,
//                     }}
//                   />
//                 )}
//                 {fileType === 'video' && (
//                   <img
//                     alt={iconText}
//                     src={backgroundImg}
//                     style={{
//                       maxWidth: (style && style.width && style.width) || 150,
//                       maxHeight: (style && style.height && style.height) || 150,
//                     }}
//                   />
//                 )}
//                 {shadow && (
//                   <div className={styles.imgShadow}>
//                     <div
//                       className={styles.shadowDiv}
//                       onClick={(event) => {
//                         event.stopPropagation();
//                       }}
//                     />
//                     <div className={styles.shadowDiv}>
//                       <Tooltip title="放大">
//                         <Icon
//                           type="zoom-in"
//                           onClick={(event) => {
//                             this.handleSetVisible(true, event);
//                           }}
//                         />
//                       </Tooltip>
//                       <Divider type="vertical" style={{ width: 2 }} />
//                       <Tooltip title="替换">
//                         <Icon type="upload" />
//                       </Tooltip>

//                       {!disabled && showDelete != 'delete' && (
//                         <>
//                           <Divider type="vertical" style={{ width: 2 }} />
//                           <Tooltip title="删除">
//                             <Icon
//                               type="delete"
//                               onClick={(event) => {
//                                 this.handleDeleteImg(event);
//                               }}
//                             />
//                           </Tooltip>
//                         </>
//                       )}
//                     </div>
//                     <div
//                       className={styles.shadowDiv}
//                       onClick={(event) => {
//                         event.stopPropagation();
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div
//                 style={{
//                   width: 150,
//                   height: 150,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   ...style,
//                 }}
//               >
//                 <Icon type="plus" />
//                 <div className="ant-upload-text" 
// style={{ marginTop: 14, whiteSpace: 'normal' }}>
//                   {iconText || '上传图片'}
//                 </div>
//               </div>
//             )}
//           </Upload>
//           <div style={{ color: '#666', 
// fontSize: '12px', lineHeight: '12px', textAlign: 'center' }}>
//             {infoText ? infoText : ''}
//           </div>
//           <Modal
//             maskClosable={false}
//             maskClosable={false}
//             visible={visible}
//             footer={null}
//             onCancel={() => this.handleSetVisible(false)}
//           >
//             {(fileType === 'img' || !fileType) && (
//               <img
//                 alt={iconText}
//                 style={{
//                   width: 476,
//                 }}
//                 src={value}
//               />
//             )}
//             {fileType === 'video' && (
//               <video
//                 alt={iconText}
//                 style={{
//                   width: 476,
//                 }}
//                 src={value}
//                 controls
//               />
//             )}
//           </Modal>
//         </Spin>
//       </div>
//     );
//   }
// }