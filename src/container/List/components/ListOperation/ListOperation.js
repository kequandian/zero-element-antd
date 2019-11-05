import React from 'react';
import { Icon, Dropdown, Menu, Popconfirm } from 'antd';
import handleAction from './handleAction';
import checkExpected from '@/utils/checkExpected';
import operationMap from './type';

export default function ListOperation(props) {
  const { state, dispatch, index, record, operation, context, handle } = props;
  const { records = [] } = context;

  if (record.operation === false) {
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
    if (typeof state.action === 'function') {
      state.action();
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