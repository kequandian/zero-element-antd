import React, { useReducer, useContext, useState } from 'react';
import ZEle from 'zero-element';
import { get as LAGet } from 'zero-element-global/lib/listAction';
import { Icon, Dropdown, Menu, Popconfirm, Modal } from 'antd';
import PageContext from 'zero-element/lib/context/PageContext';
import { getDataPool } from 'zero-element/lib/DataPool';
import { formatAPI } from 'zero-element/lib/utils/format';
import checkExpected from '@/utils/checkExpected';
import operationMap from './type';
import '../../index.css';

const initialState = {
  deleteConfirm: false,
  modal: false,
  modalTitle: '',
  modalConfig: {},
};

function reducer(state, { type, payload }) {
  const map = {
    deleteConfirm() {
      return {
        deleteConfirm: true,
      };
    },
    deleteCancel() {
      return {
        deleteConfirm: false,
      };
    },
    openModal() {
      return {
        modalTitle: payload.modalTitle,
        modalConfig: payload.modalConfig,
        modal: true,
      };
    },
    closeModal() {
      return {
        modalTitle: '',
        modalConfig: {},
        modal: false,
      };
    },
    defaults() {
      console.warn(`未定义的方法: ${type}`);
      return state;
    }
  };
  return (map[type] || map['defaults'])();
}

function handleAction(type, options, props, dispatch) {
  const { record, handle, context } = props;
  const { API, saveToForm } = options;
  const { namespace } = context;
  const dataPool = getDataPool(namespace);

  if (type === undefined) {
    console.warn('请指定 list operation 所用的 action');
    return false;
  }
  type = type.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());

  const actionFunc = handle[`on${type}`];
  if (typeof actionFunc === 'function') {
    dataPool.setRecord(record);

    if (saveToForm) {
      console.warn(`saveToForm TODO`);
    }

    if (type === 'Delete') {
      dispatch({
        type: 'deleteConfirm',
      });
    } else {
      actionFunc({
        record,
        options: {
          ...options,
          API: API ? formatAPI(API, { namespace, }) : API,
        },
      },
        context
      );
    }

  } else {
    console.warn(`未注册的事件： on${type}`)
  }
}

function ListOperation(props) {
  const { state, dispatch, index, record, operation, context, handle } = props;
  const { records = [] } = context;

  function handleCancel() {
    dispatch({
      type: 'deleteCancel',
    });
  }
  function handleConfirm() {
    handle[`onDelete`]({ record });
    dispatch({
      type: 'deleteCancel',
    });
  }
  function onAction(action, options) {
    handleAction(action, options, props, dispatch);
  }

  const popconfirmProps = {
    title: '确定要删除该项吗？',
    visible: state.deleteConfirm,
    onCancel: handleCancel,
    onConfirm: handleConfirm,
  };

  const outsideList = [];
  const dropdownList = [];
  operation.forEach((item, i) => {
    item.options = item.options || {};
    if (checkExpected(record, item.options)) {
      if (item.options.outside) {
        outsideList.push(operationMap['outside'](item, i, { index, record, records }, onAction));
      } else {
        if (operationMap[item.action]) {
          outsideList.push(operationMap[item.action](item, i, { index, record, records }, onAction));
        } else {
          dropdownList.push((operationMap['dropdown'])(item, i, { index, record, records }, onAction));
        }
      }
    }

  })

  return <Popconfirm {...popconfirmProps}>
    <div className="ZEleA-table-action">
      <div className="ZEleA-table-action-Outside">
        {outsideList}
      </div>
      {dropdownList.length ? (
        <Dropdown overlay={renderMemu(dropdownList)} trigger={['click']} placement="bottomRight">
          <Icon style={{ fontSize: '24px' }} type="ellipsis" />
        </Dropdown>
      ) : outsideList.length === 0 ?
          (<span className="ZEleA-table-action-empty">暂无</span>) : null}
    </div>
  </Popconfirm>
}

function renderMemu(menuItemList) {
  if (menuItemList.length === 0) {
    menuItemList.push(<Menu.Item key="99" disabled>暂无</Menu.Item>);
  }
  return <Menu>
    {menuItemList}
  </Menu>;
}

export default function ListOperationWrapped(props) {
  const context = useContext(PageContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { handle = {} } = props;

  function onModal(props) {
    const { options } = props;
    const { modalTitle, ...rest } = options;
    dispatch({
      type: 'openModal',
      payload: {
        modalTitle,
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
        ...LAGet(),
      }}
    />
    <Modal
      visible={state.modal}
      title={state.modalTitle}
      destroyOnClose={true}
      onCancel={handleClose}
      bodyStyle={{
        padding: 0,
      }}
      footer={null}
    >
      <ZEle
        MODAL={true}
        namespace={context.namespace}
        config={state.modalConfig}
        onClose={handleClose}
      />
    </Modal>
  </>
}