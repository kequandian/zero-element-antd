import React, { useState, useRef } from 'react';
import { Drawer, Button, Modal } from 'antd';
import ZEle from 'zero-element';
import FieldItem from './FieldItem';
import '../../index.css';
import useArray from '@/utils/hooks/useArray';

export default ({
  namespace,
  visible, onSwitchVisibel,
  fields = [],
  onSaveFields,
}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const formRef = useRef();
  const [fieldList, handle] = useArray(fields);

  function handleOpenModal(data) {
    setModalData(data);
    setModalVisible(true);
  }
  function handleCloseModal() {
    setModalVisible(false);
  }
  function handleSaveModal() {
    formRef.current.submit();
  }
  function handleOnMoveField(type, data) {
    handle.onMove(data._id, type);
  }
  function handleSwitchChecked(data) {
    const checked = data._checked === false ? true : false;

    handle.onUpdate(data._id, {
      ...data,
      _checked: checked,
    });
  }
  function handleSubmit(submitData, handleResponse) {
    handle.onUpdate(submitData.id, submitData);
    handleCloseModal();
  }

  function handleSaveFields() {
    onSaveFields(fieldList);
  }

  const fieldItemProps = {
    onSwitchChecked: handleSwitchChecked,
    onMoveField: handleOnMoveField,
    onOpenModal: handleOpenModal,
  };

  return <Drawer
    title="列表字段编辑"
    placement="right"
    closable={false}
    onClose={onSwitchVisibel}
    visible={visible}
  >
    {fieldList && fieldList.map(item => {
      return <FieldItem data={item} key={item._id} {...fieldItemProps} />
    })}
    <div className="ZEleA-ListFieldsEdit-divider">
      <Button onClick={onSwitchVisibel}>取消</Button>
      <Button type="primary" onClick={handleSaveFields}>确定</Button>
    </div>
    <Modal
      title="编辑字段属性"
      width={660}
      visible={modalVisible}
      onOk={handleSaveModal}
      onCancel={handleCloseModal}
      destroyOnClose
    >
      <ZEle
        namespace={namespace}
        config={config}
        extraData={modalData}
        formRef={formRef}
        onSubmit={handleSubmit}
        footer={null}
      />
    </Modal>
  </Drawer>
}

const config = {
  items: [
    {
      component: 'Form',
      config: {
        layout: "Grid",
        layoutConfig: {
          value: [12, 12]
        },
        fields: [
          { label: '名称', field: 'label', type: 'input' },
          { label: '字段', field: 'field', type: 'input' },
          { label: '类型', field: 'valueType', type: 'input' },
          { label: '', field: 'id', type: 'hidden' },
          { label: '配置', field: 'options', type: 'json', span: 24 },
        ]
      }
    }
  ]
}