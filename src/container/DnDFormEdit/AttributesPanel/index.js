import React from 'react';
import { Drawer, Input, Button } from 'antd';

import ItemEdit from './components/ItemEdit';

import '../index.css';

function renderBaseOptions(opt, handle) {
  return Object.keys(opt).map(key => {
    return <span key={key}>
      <span>{opt[key].label}</span>
      <Input
        value={opt[key].value}
        onChange={handle.bind(null, key)}
      />
    </span>
  })
}

function renderStyleOptions(opt, handle) {
  return Object.keys(opt).map(key => {
    return <span key={key}>
      <span>{opt[key].label}</span>
      <Input
        value={opt[key].value}
        onChange={handle.bind(null, key)}
      />
    </span>
  })
}

function renderItemsOptions(items, handle, onRemove) {
  return items.map((item, i) => {
    return <span key={i}>
      <ItemEdit
        label={item.label}
        value={item.value}
        index={i}
        onChange={handle}
        onRemove={onRemove}
      />
      <br />
    </span>
  })
}

export default ({ current, dispatch }) => {
  const { options = {} } = current;
  const { base = {}, style, items } = options;

  function onSave() {
    dispatch({
      type: 'save',
      payload: {
        current: {
          ...current,
        },
      }
    });
    dispatch({
      type: 'editElement',
      payload: current,
    })
  }
  function handleClose() {
    dispatch({
      type: 'save',
      payload: {
        current: {},
      }
    });
  }
  function handleBaseChange(key, e) {
    base[key].value = e.target.value;
    onSave();
  }
  function handleStyleChange(key, e) {
    style[key].value = e.target.value;
    options.style = { ...style };
    onSave();
  }
  function handleItemsChange(i, type, e) {
    items[i][type] = e.target.value;
    onSave();
  }
  function handleItemAdd() {
    items.push({
      label: `选项${items.length + 1}`,
      value: items.length + 1,
    });
    onSave();
  }
  function handleItemDel(i) {
    items.splice(i, 1);
    onSave();
  }

  return <Drawer
    visible={Boolean(current.id)}
    mask={false}
    onClose={handleClose}
  >
    <div className="ZEle-DnDFormEdit-title">基本属性</div>
    {renderBaseOptions(base, handleBaseChange)}
    {items ? (
      <>
        <div className="ZEle-DnDFormEdit-title">子项</div>
        <Button type="dashed" icon="plus"
          onClick={handleItemAdd}>
          添加子项
        </Button>
        <br /><br />
        {renderItemsOptions(items, handleItemsChange, handleItemDel)}
      </>
    ) : null}
    {style ? (
      <>
        <div className="ZEle-DnDFormEdit-title">样式</div>
        {renderStyleOptions(style, handleStyleChange)}
      </>
    ) : null}
  </Drawer>
}