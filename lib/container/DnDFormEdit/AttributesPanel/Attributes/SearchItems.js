function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toNumber, arrayItemMove } from "../../../../utils/tool";
import ItemEdit from "../components/ItemEdit";
export default function ({
  data,
  onSave
}) {
  function renderItemsOptions(data, handle, otherProps = {}) {
    return /*#__PURE__*/React.createElement(ItemEdit, _extends({
      items: data
    }, handle, otherProps));
  }

  function handleItemChange(i, type, e) {
    data[i][type] = toNumber(e.target.value);
    onSave();
  }

  function handleItemAdd() {
    data.push({
      label: `字段${data.length + 1}`,
      value: data.length + 1,
      type: 'input'
    });
    onSave();
  }

  function handleItemDel(i) {
    data.splice(i, 1);
    onSave();
  }

  function handleItemIndexChange(type, index) {
    arrayItemMove(data, type, index);
    onSave();
  }

  return data ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ZEleA-DnDFormEdit-title"
  }, "\u641C\u7D22\u5B57\u6BB5"), /*#__PURE__*/React.createElement(Button, {
    type: "dashed",
    icon: /*#__PURE__*/React.createElement(PlusOutlined, null),
    onClick: handleItemAdd
  }, "\u6DFB\u52A0\u5B57\u6BB5"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), renderItemsOptions(data, {
    onChange: handleItemChange,
    onRemove: handleItemDel,
    onIndexChange: handleItemIndexChange
  })) : null;
}