import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ZEle from 'zero-element';
import { UploadOutlined } from '@ant-design/icons';
import './index.css';

export default function ImportExcel(props) {
  const { title = '导入', options = {}, namespace, handle, ...restProps } = props;
  const {
    modalTitle = 'Excel 导入', modalWidth,
    API = '/api/io/excel/import',
    name,
    ...rest
  } = options;
  const [visible, setViseble] = useState(false);

  function handleOpen() {
    setViseble(true);
  }
  function handleClose() {
    setViseble(false);
  }
  function handleCloseAndQuery() {
    setViseble(false);
    if (typeof handle.onRefresh === 'function') {
      handle.onRefresh();
    }
  }

  if (!API) {
    console.warn('import-excel 缺少必要的 options : API');
  }

  const config = {
    layout: 'Empty',
    items: [
      {
        layout: 'Empty',
        component: 'Form',
        config: {
          API: {
            getAPI: API,
          },
          fields: [
            {
              label: 'Excel 文件', field: 'multipartFile', type: 'upload-file',
              options: {
                fileNameField: 'source',
                ...rest,
              }
            },
            { field: 'name', type: 'hidden', value: name },
          ]
        }
      }
    ]
  };

  return <>
    <Button
      className="ZEle-action-button"
      onClick={handleOpen}
      icon={<UploadOutlined />}
    >
      {title}
    </Button>
    <Modal
      title={modalTitle}
      width={modalWidth}
      visible={visible}
      destroyOnClose={true}
      onCancel={handleClose}
      bodyStyle={{
        padding: 0,
      }}
      footer={null}
    >
      <ZEle
        MODAL={true}
        namespace={namespace}
        config={config}
        {...restProps}
        onClose={handleCloseAndQuery}
      />
    </Modal>
  </>
}