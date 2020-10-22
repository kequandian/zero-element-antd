import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { formatAPI } from 'zero-element/lib/utils/format';
import ZEle from 'zero-element';

/**
 * 在弹出的模态框里面完成导入
 * 同时带有一个按钮以便下载导入模板
 * @param {*} props 
 */
export default function ImportModal(props) {
  const { title = '导入', options = {}, className, namespace, handle, ...restProps } = props;
  const {
    API = '/api/io/excel/import/<name>',
    templateUrl = '',
    modalTitle = '导入', modalWidth,
    name,
    ...rest
  } = options;
  const [visible, setVisible] = useState(false);

  const fAPI = formatAPI(API, {
    namespace,
    data: {
      name,
    }
  });

  function handleOpen() {
    setVisible(true);
  }
  function handleClose() {
    setVisible(false);
  }

  function handleCloseAndQuery() {
    handleClose();
    if (typeof handle.onRefresh === 'function') {
      handle.onRefresh();
    }
  }

  if (!API) {
    console.warn('import-modal 缺少必要的 options : API');
  }
  if (!templateUrl) {
    console.warn('import-modal 缺少必要的 options : templateUrl');
  }

  const config = {
    items: [
      {
        component: 'Form',
        config: {
          API: {},
          fields: [
            {
              label: '导入模板', field: '_template', type: 'download',
              options: {
                title: '点击下载',
                url: templateUrl,
              }
            },
            {
              label: '导入文件', field: 'multipartFile', type: 'direct-upload',
              options: {
                title: '点击上传',
                API: fAPI,
              }
            }
          ]
        }
      }
    ]
  };

  return <>
    <Button onClick={handleOpen} className={className}>
      {title}
    </Button>
    <Modal
      title={modalTitle}
      width={modalWidth}
      visible={visible}
      destroyOnClose={true}
      onCancel={handleCloseAndQuery}
      bodyStyle={{
        padding: 0,
      }}
      footer={null}
    >
      <ZEle
        MODAL={true}
        namespace={namespace}
        {...restProps}
        config={{
          layout: 'Empty',
          ...config,
        }}
        onClose={handleCloseAndQuery}
        footer={null}
      />
    </Modal>
  </>
}