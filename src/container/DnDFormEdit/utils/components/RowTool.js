import React, { useState } from 'react';
import {
  DeleteOutlined,
  UpOutlined,
  DownOutlined,
  EditOutlined,
} from '@ant-design/icons';
import EditModal from './EditModal';
import '../../index.css';

function handleRemoveRow(dispatch, config) {
  dispatch({
    type: 'delRow',
    payload: config,
  });
}
function handleMoveUp(dispatch, config) {
  dispatch({
    type: 'rowMoveUp',
    payload: config,
  });
}
function handleMoveDown(dispatch, config) {
  dispatch({
    type: 'rowMoveDown',
    payload: config,
  });
}

export default function RowTool({ dispatch, config, component }) {
  const [visible, setVisible] = useState(false);

  function handleOpenModal() {
    setVisible(true);
  }
  function handleCloseModal() {
    setVisible(false);
  }
  function handleChangeRowValue(newValue) {
    dispatch({
      type: 'editRowValue',
      payload: {
        id: config.id,
        value: newValue,
      },
    });
    handleCloseModal();
  }

  return <div className="ZEleA-DnDFormEdit-rowBox">
    <div className="ZEleA-DnDFormEdit-itemTool ZEleA-DnDFormEdit-itemTool-left">
      <DeleteOutlined
        onClick={handleRemoveRow.bind(null, dispatch, config)}
        className="ZEleA-DnDFormEdit-danger"
      />
    </div>
    <div
      className="ZEleA-DnDFormEdit-itemTool ZEleA-DnDFormEdit-itemTool-right"
    >
      <UpOutlined
        onClick={handleMoveUp.bind(null, dispatch, config)}
        className="ZEleA-DnDFormEdit-primary"
      />
      <DownOutlined
        onClick={handleMoveDown.bind(null, dispatch, config)}
        className="ZEleA-DnDFormEdit-primary"
      />
      <EditOutlined
        onClick={handleOpenModal.bind(null, dispatch, config)}
        className="ZEleA-DnDFormEdit-primary"
      />
    </div>
    {component}
    <EditModal
      visible={visible}
      config={config}
      onCancel={handleCloseModal}
      onSave={handleChangeRowValue}
    />
  </div>
}