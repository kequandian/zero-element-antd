import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ZEle from 'zero-element';
import './index.css';

export default function ImportExcel(props) {
  const { title = '导入', options, namespace, handle, ...restProps } = props;
  const {
    icon = 'upload', modalTitle = 'Excel 导入', modalWidth,
    url,
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

  if (!url) {
    console.warn('import-excel 缺少必要的 options : url');
  }

  const config = {
    layout: 'Empty',
    items: [
      {
        layout: 'Empty',
        component: 'BaseForm',
        config: {
          API: {
            getAPI: url,
          },
          fields: [
            {
              label: 'Excel 文件', field: 'file', type: 'upload-file',
              options: {
                fileNameField: 'source',
                ...rest,
              }
            }
          ]
        }
      }
    ]
  };

  return <>
    <Button
      className="ZEle-action-button"
      onClick={handleOpen}
      icon={icon}
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