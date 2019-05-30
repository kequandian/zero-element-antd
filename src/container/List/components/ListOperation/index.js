import React, { useReducer, useContext } from 'react';
import { get as LAGet } from 'zero-element-global/lib/listAction';
import { Icon, Dropdown, Menu, Popconfirm } from 'antd';
import PageContext from 'zero-element/lib/context/PageContext';
import checkExpected from '@/utils/checkExpected';
import operationMap from './type';
import '../../index.css';

const initialState = {
  visible: false,
};

function reducer(state, { type }) {
  const map = {
    deleteConfirm() {
      return {
        visible: true,
      };
    },
    deleteCancel() {
      return {
        visible: false,
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
  const { record, handle } = props;
  const { saveToForm } = options;
  if (type === undefined) {
    console.warn('请指定 list operation 所用的 action');
    return false;
  }
  type = type.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());

  const actionFunc = handle[`on${type}`];
  if (actionFunc) {

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
        options,
        // ACTIONTYPE: 'edit',
      });
    }

  } else {
    console.warn(`未注册的事件： on${type}`)
  }
}

function ListOperation(props) {

  const [state, dispatch] = useReducer(reducer, initialState);
  const { index, record, operation, context, handle } = props;
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
    visible: state.visible,
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
    <div className="ZEle-table-action">
      <div className="ZEle-table-action-Outside">
        {outsideList}
      </div>
      {dropdownList.length ? (
        <Dropdown overlay={renderMemu(dropdownList)} trigger={['click']} placement="bottomRight">
          <Icon style={{ fontSize: '24px' }} type="ellipsis" />
        </Dropdown>
      ) : outsideList.length === 0 ?
          (<span className="ZEle-table-action-empty">暂无</span>) : null}
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
  const { handle = {} } = props;
  return <ListOperation
    {...props}
    context={context}
    handle={{
      ...handle,
      ...LAGet(),
    }}
  />
}