import React, { useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import TableCheckbox from '@/formItemType/ModalCheckbox/TableCheckbox';

export default (props) => {
  const { value, title, options, namespace, onCreateList, onGetFormData } = props;
  const {
    modalTitle, modalWidth,
    API,
    fields,
    field,
    value: optValue = 'id',
    requireValid,
    pagination,
    ...rest
  } = options;
  const [visible, setViseble] = useState(false);
  const selectedData = useRef([]);

  function handleOpen() {
    setViseble(true);
  }
  function handleClose() {
    setViseble(false);
  }

  function hanldeChange(data) {
    selectedData.current.push(...data);
  }
  function handleSave() {
    onCreateList(selectedData.current);
    handleClose();
  }

  // const value = onGetFormData()[field];
  // console.log(123, value);

  return <div>
    <Button onClick={handleOpen} type="primary">
      {title}
    </Button>
    <Modal
      title={modalTitle}
      width={modalWidth}
      visible={visible}
      destroyOnClose={true}
      onCancel={handleClose}
      bodyStyle={{
        // padding: 0,
      }}
      onOk={handleSave}
    >
      <TableCheckbox
        value={value}
        field={field}
        optValue={optValue}
        onChange={hanldeChange}
        onGetFormData={onGetFormData}

        API={API}
        fields={fields}
        pagination={pagination}
        requireValid={requireValid}
      />
    </Modal>
  </div>
}