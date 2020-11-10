import React from 'react';
import { Card, Input } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { Flex } from 'layout-flex';
import Options from "./Options";
import EditJson from "./EditJson";
import "./index.css";
const {
  FlexItem
} = Flex;
export default function ItemEdit(props) {
  const {
    label,
    index,
    type,
    valueType,
    options,
    valueField = 'value',
    disabled,
    // 禁用 options 的编辑,
    text: {
      label: tLabel = '文本',
      value: tValue = '值'
    },
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
    }, label),
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
  }, /*#__PURE__*/React.createElement("span", null, tLabel, ": "), /*#__PURE__*/React.createElement(Input, {
    value: label,
    onChange: onChange.bind(null, index, 'label')
  }), /*#__PURE__*/React.createElement("span", null, tValue, ": "), /*#__PURE__*/React.createElement(Input, {
    value: props[valueField],
    onChange: onChange.bind(null, index, valueField)
  }), type !== undefined ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\u5B57\u6BB5\u7C7B\u578B: "), /*#__PURE__*/React.createElement(Flex, null, /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement(Input, {
    value: type,
    onChange: onChange.bind(null, index, 'type')
  })), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(EditJson, {
    value: options,
    onChange: onChange.bind(null, index, 'options')
  })))) : null, valueType !== undefined ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\u6E32\u67D3\u7C7B\u578B: "), /*#__PURE__*/React.createElement(Flex, null, /*#__PURE__*/React.createElement(FlexItem, {
    flex: 1
  }, /*#__PURE__*/React.createElement(Input, {
    value: valueType,
    onChange: onChange.bind(null, index, 'valueType')
  })), /*#__PURE__*/React.createElement(FlexItem, null, /*#__PURE__*/React.createElement(EditJson, {
    value: options,
    onChange: onChange.bind(null, index, 'options')
  })))) : null, /*#__PURE__*/React.createElement(Options, {
    index: index,
    data: options,
    disabled: disabled,
    onChange: onOptionsChange
  }));
}