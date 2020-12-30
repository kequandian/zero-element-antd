import React, { useReducer } from 'react';
import ZEle from 'zero-element';
import { get as LAGet } from 'zero-element/lib/config/listAction';
import { Modal } from 'antd';
// import PageContext from 'zero-element/lib/context/PageContext';
import { formatAPI } from 'zero-element/lib/utils/format';
import ListOperation from './ListOperation';
import reducer from './reducer';
import '../../index.css';

const initialState = {
  confirm: false,
  modal: false,
  modalTitle: '',
  modalStyle: {},
  pagination: undefined,
  modalConfig: {},
  index: -1, // modal
  operationIndex: -1, // 当前激活的 operation index
  loading: false,
};

export default function ListOperationWrapped(props) {
  // const context = useContext(PageContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { index, namespace, handle = {}, extraData = {}, model } = props;

  function onModal(cfg) {
    const { options } = cfg;
    const { modalTitle, modalWidth, modalStyle, pagination, ...rest } = options;
    const fTitle = formatAPI(modalTitle, {
      namespace,
    });

    dispatch({
      type: 'openModal',
      payload: {
        modalTitle: fTitle,
        modalWidth,
        modalStyle,
        pagination: pagination,
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
    const { modalTitle, modalWidth, modalStyle, ...rest } = options;
    const fTitle = formatAPI(modalTitle, {
      namespace,
    });

    dispatch({
      type: 'openModal',
      payload: {
        modalTitle: fTitle,
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
      handle={{
        ...handle,
        onModal,
        onChildEditModal,
        ...LAGet(),
      }}
    />
    <Modal
      style={state.modalStyle}
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
        namespace={model.namespace}
        config={{
          layout: 'Empty',
          ...state.modalConfig,
        }}
        onClose={handleClose}
        onSubmit={state.onSubmit}
        data={state.data}
        extraData={extraData}
        pagination={state.pagination}
      />
    </Modal>
  </>
}