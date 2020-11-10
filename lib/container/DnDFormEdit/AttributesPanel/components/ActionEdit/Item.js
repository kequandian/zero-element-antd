import React from 'react';
import { Card, Input } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { Flex } from 'layout-flex';
import EditJson from "../ItemEdit/EditJson";
import "../ItemEdit/index.css";
const {
  FlexItem
} = Flex;
export default function ItemEdit(props) {
  const {
    title,
    index,
    type,
    options,
    editId,
    onClick,
    onChange,
    onRemove,
    onOptionsChange,
    onIndexChange
  } = props;
  const edit = editId === index;

  function handleClick() {
    onClick(index);
  }

  function handleMoveUp() {
    onIndexChange('up', index);
  }

  function handleMoveDown() {
    onIndexChange('down', index);
  }

  return /*#__PURE__*/React.createElement(Card, {
    size: "small",
    className: edit ? 'ZEleA-DnDFormEdit-ItemEdit-editing' : undefined,
    title: /*#__PURE__*/React.createElement("div", {
      className: "ZEleA-DnDFormEdit-ItemEdit-title",
      onClick: handleClick
    }, title),
    extra: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ArrowUpOutlined, {
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit",
      onClick: handleMoveUp
    }), /*#__PURE__*/React.createElement(ArrowDownOutlined, {
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit",
      onClick: handleMoveDown
    }), /*#__PURE__*/React.createElement(DeleteOutlined, {
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-delete",
      onClick: onRemove.bind(null, index)
    }), edit ? /*#__PURE__*/React.createElement(UpOutlined, {
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit",
      onClick: handleClick
    }) : /*#__PURE__*/React.createElement(DownOutlined, {
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit",
      onClick: handleClick
    })),
    bodyStyle: {
      display: edit ? 'block' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u6309\u94AE\u6587\u672C: "), /*#__PURE__*/React.createElement(Input, {
    value: title,
    onChange: onChange.bind(null, index, 'title')
  }), type !== undefined ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\u6E32\u67D3\u7C7B\u578B: "), /*#__PURE__*/React.createElement(Flex, null, /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement(Input, {
    value: type,
    onChange: onChange.bind(null, index, 'type')
  })), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(EditJson, {
    value: options,
    onChange: onChange.bind(null, index, 'options')
  })))) : null);
}