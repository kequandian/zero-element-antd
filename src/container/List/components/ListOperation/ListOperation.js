import React from 'react';
import { Dropdown, Menu, Spin, Popconfirm } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import handleAction from './handleAction';
import checkExpected from '@/utils/checkExpected';
import { getModel } from 'zero-element/lib/Model';
import operationMap from './type';
import global from 'zero-element/lib/config/global';

export default function ListOperation(props) {
  const { state, model, dispatch, index, record, operation, handle } = props;
  const { listData } = getModel(model.namespace);
  const { records } = listData;
  const { listOperationEmptyText } = global;

  if (record && record.operation === false) {
    return null;
  }

  function handleCancel() {
    dispatch({
      type: 'closeConfirm',
    });
    if (handle.onClickOperation) {
      handle.onClickOperation({});
    }
  }
  function handleConfirm() {
    if (typeof state.type === 'function') {
      const rst = state.type();

      if (rst && typeof rst.then === 'function') {
        dispatch({
          type: 'isLoading',
        });

        rst.then(_ => {
          dispatch({
            type: 'endOfLoading',
          });
        })
      }
    }
    dispatch({
      type: 'closeConfirm',
    });
  }
  function onAction(action, options) {
    handleAction(action, options, props, dispatch);
  }

  const popconfirmProps = {
    title: state.title,
    visible: state.confirm,
    onCancel: handleCancel,
    onConfirm: handleConfirm,
    arrowPointAtCenter: true,
    getPopupContainer: triggerNode => triggerNode,
    overlayStyle: {
      minWidth: 200,
    }
  };

  const outsideList = [];
  const dropdownList = [];
  operation.forEach((item, i) => {
    item.options = item.options || {};

    if (checkExpected(record, item.expect || item.options)) {
      if (item.options.outside) {
        outsideList.push(operationMap['outside'](item, i, { index, record, records }, onAction));
      } else {
        if (operationMap[item.type]) {
          outsideList.push(operationMap[item.type](item, i, { index, record, records }, onAction));
        } else {
          dropdownList.push((operationMap['dropdown'])(item, i, { index, record, records }, onAction));
        }
      }
    }

  })

  return <Popconfirm {...popconfirmProps}>
    <Spin spinning={state.loading}>
      <div className="ZEleA-table-action">
        <div className="ZEleA-table-action-Outside">
          {outsideList}
        </div>
        {dropdownList.length ? (
          <Dropdown
            overlay={renderMemu(dropdownList)}
            trigger={['click']}
            placement="bottomRight"
            getPopupContainer={triggerNode => triggerNode}
          >
            <EllipsisOutlined style={{ fontSize: '24px' }} />
          </Dropdown>
        ) : outsideList.length === 0 ?
            (<span className="ZEleA-table-action-empty">{listOperationEmptyText}</span>) : null}
      </div>
    </Spin>
  </Popconfirm>
}

function renderMemu(menuItemList) {
  if (menuItemList.length === 0) {
    menuItemList.push(<Menu.Item key="99" disabled>{listOperationEmptyText}</Menu.Item>);
  }
  return <Menu>
    {menuItemList}
  </Menu>;
}