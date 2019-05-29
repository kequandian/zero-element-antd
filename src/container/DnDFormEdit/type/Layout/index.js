import React, { useState } from 'react';
import Container from './Container';
import Element from './Element';
import EditModal from './EditModal';

export default (props) => {
  const { itemCfg = {}, config, index, dispatch } = props;
  const { value, items } = config;
  const [visible, setVisible] = useState(false);

  function handleRemove(i, e) {
    e && e.stopPropagation && e.stopPropagation();

    dispatch({
      type: 'delElement',
      payload: {
        id: config.id,
        index: i,
      }
    });
  }
  function handleActiveEdit(i) {
    dispatch({
      type: 'currentEdit',
      payload: items[i],
    });
  }
  function handleCopyElement(i, e) {
    e && e.stopPropagation && e.stopPropagation();
    dispatch({
      type: 'copyElement',
      payload: items[i],
    });
  }

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

  function handleRemoveRow() {
    dispatch({
      type: 'delRow',
      payload: config,
    });
  }

  return <>
    {itemCfg.id ? (
      <Element
        index={index}
        data={itemCfg}
        onRemove={handleRemove}
        onEdit={handleActiveEdit}
        onCopy={handleCopyElement}
      />
    ) : (
        <Container
          layoutId={config.id}
          index={index}
          onEditRow={handleOpenModal}
          onRemoveRow={handleRemoveRow}
        />
      )}
    <EditModal
      visible={visible}
      config={config}
      onCancel={handleCloseModal}
      onSave={handleChangeRowValue}
    />
  </>;
}