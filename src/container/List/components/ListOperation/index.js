import React, { useReducer, useContext } from 'react';
import ZEle from 'zero-element';
import { get as LAGet } from 'zero-element-global/lib/listAction';
import { Modal } from 'antd';
import PageContext from 'zero-element/lib/context/PageContext';
import ListOperation from './ListOperation';
import reducer from './reducer';
import '../../index.css';

const initialState = {
  confirm: false,
  modal: false,
  modalTitle: '',
  modalConfig: {},
  index: -1,
};

export default function ListOperationWrapped(props) {
  const context = useContext(PageContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { index, handle = {}, extraData = {} } = props;

  function onModal(cfg) {
    const { options } = cfg;
    const { modalTitle, modalWidth, ...rest } = options;
    dispatch({
      type: 'openModal',
      payload: {
        modalTitle,
        modalWidth,
        modalConfig: rest,
      }
    });
  }
  function handleClose() {
    dispatch({
      type: 'closeModal',
      payload: {
        modal: false,
      }
    });
    if (handle.onRefresh) {
      handle.onRefresh();
    }
  }
  function onChildEditModal(cfg) {
    const { options } = cfg;
    const { modalTitle, modalWidth, ...rest } = options;
    dispatch({
      type: 'openModal',
      payload: {
        modalTitle,
        modalWidth,
        modalConfig: rest,
        onSubmit: handle.onEdit,
        data: props.record,
        index,
      }
    });
  }

  return <>
    <ListOperation
      {...props}
      state={state}
      dispatch={dispatch}
      context={context}
      handle={{
        ...handle,
        onModal,
        onChildEditModal,
        ...LAGet(),
      }}
    />
    <Modal
      visible={state.modal}
      title={state.modalTitle}
      width={state.modalWidth}
      destroyOnClose={true}
      onCancel={handleClose}
      bodyStyle={{
        padding: 0,
      }}
      footer={null}
    >
      <ZEle
        MODAL={true}
        index={index || state.index}
        namespace={context.namespace}
        config={{
          layout: 'Empty',
          ...state.modalConfig,
        }}
        onClose={handleClose}
        onSubmit={state.onSubmit}
        data={state.data}
        extraData={extraData}
      />
    </Modal>
  </>
}