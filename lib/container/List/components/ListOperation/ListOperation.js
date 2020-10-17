function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef } from 'react';
import { Dropdown, Menu, Spin, Popconfirm } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import handleAction from "./handleAction";
import checkExpected from "../../../../utils/checkExpected";
import { getModel } from 'zero-element/lib/Model';
import operationMap from "./type";
import global from 'zero-element/lib/config/global';
export default function ListOperation(props) {
  const {
    state,
    model,
    dispatch,
    index,
    record,
    operation,
    handle
  } = props;
  const {
    listData
  } = getModel(model.namespace);
  const {
    records
  } = listData;
  const {
    listOperationEmptyText
  } = global;
  const containerRef = useRef(null);

  if (record && record.operation === false) {
    return null;
  }

  function handleCancel() {
    dispatch({
      type: 'closeConfirm'
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
          type: 'isLoading'
        });
        rst.finally(_ => {
          dispatch({
            type: 'endOfLoading'
          });
        });
      }
    }

    dispatch({
      type: 'closeConfirm'
    });
  }

  function onAction(action, options, other) {
    handleAction(action, options, props, dispatch, other);
  }

  const globalPopconfirmProps = {
    title: /*#__PURE__*/React.createElement("div", null, state.title),
    visible: state.operationIndex === -1 ? state.confirm : undefined,
    onCancel: handleCancel,
    onConfirm: handleConfirm,
    arrowPointAtCenter: false,
    getPopupContainer: triggerNode => triggerNode.parentNode,
    overlayStyle: {
      minWidth: 260
    },
    placement: 'topRight'
  };
  const popconfirmProps = { ...globalPopconfirmProps,
    operationIndex: state.operationIndex,
    visible: undefined
  };
  const outsideList = [];
  const dropdownList = [];
  operation.forEach((item, i) => {
    item.options = item.options || {};

    if (checkExpected(record, item.expect || item.options)) {
      if (item.options.outside) {
        outsideList.push(operationMap['outside'](item, i, {
          index,
          record,
          records
        }, onAction, popconfirmProps));
      } else {
        if (operationMap[item.type]) {
          outsideList.push(operationMap[item.type](item, i, {
            index,
            record,
            records
          }, onAction, popconfirmProps));
        } else {
          dropdownList.push(operationMap['dropdown'](item, i, {
            index,
            record,
            records
          }, onAction, {}));
        }
      }
    }
  });
  return /*#__PURE__*/React.createElement(Spin, {
    spinning: state.loading
  }, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-table-action",
    ref: containerRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-table-action-Outside"
  }, outsideList), dropdownList.length ? /*#__PURE__*/React.createElement(Popconfirm, _extends({}, globalPopconfirmProps, {
    placement: "topRight"
  }), /*#__PURE__*/React.createElement(Dropdown, {
    overlay: renderMemu(dropdownList),
    trigger: ['click'],
    placement: index + 1 === records.length ? 'topRight' : 'bottomRight',
    getPopupContainer: _ => containerRef.current
  }, /*#__PURE__*/React.createElement(EllipsisOutlined, {
    style: {
      fontSize: '24px'
    }
  }))) : outsideList.length === 0 ? /*#__PURE__*/React.createElement("span", {
    className: "ZEleA-table-action-empty"
  }, listOperationEmptyText) : null));
}

function renderMemu(menuItemList) {
  if (menuItemList.length === 0) {
    menuItemList.push( /*#__PURE__*/React.createElement(Menu.Item, {
      key: "99",
      disabled: true
    }, listOperationEmptyText));
  }

  return /*#__PURE__*/React.createElement(Menu, null, menuItemList);
}