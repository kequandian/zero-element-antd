import React from 'react';
import { Drawer, Button } from 'antd';

import ItemEdit from './components/ItemEdit';
import { renderBaseOptions, renderStyleOptions, renderAdvancedOptions } from './components/render';

import '../index.css';

function renderItemsOptions(items, handle, onRemove) {
  return items.map((item, i) => {
    return <div key={i}>
      <ItemEdit
        label={item.label}
        value={item.value}
        index={i}
        onChange={handle}
        onRemove={onRemove}
      />
      <br />
    </div>
  })
}

export default ({ current, dispatch }) => {
  const { options = {} } = current;
  const { base = {}, style, items, advanced, table } = options;

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
  function handleAdvancedChange(key, value) {
    advanced[key].value = value;
    options.advanced = { ...advanced };
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

  function handleTableChange(i, type, e) {
    table[i][type] = e.target.value;
    onSave();
  }
  function handleTableAdd() {
    table.push({
      label: `字段${table.length + 1}`,
      value: table.length + 1,
    });
    onSave();
  }
  function handleTableDel(i) {
    table.splice(i, 1);
    onSave();
  }

  return <Drawer
    visible={Boolean(current.id)}
    mask={false}
    onClose={handleClose}
  >
    <div className="ZEleA-DnDFormEdit-title">基本属性</div>
    {renderBaseOptions(base, handleBaseChange)}
    {items ? (
      <>
        <div className="ZEleA-DnDFormEdit-title">子项</div>
        <Button type="dashed" icon="plus"
          onClick={handleItemAdd}>
          添加子项
        </Button>
        <br /><br />
        {renderItemsOptions(items, handleItemsChange, handleItemDel)}
      </>
    ) : null}
    {advanced ? (
      <>
        <div className="ZEleA-DnDFormEdit-title">高级</div>
        {renderAdvancedOptions(advanced, options, {
          onAdvancedChange: handleAdvancedChange,
          onSave,
        })}
        <div className="ZEleA-DnDFormEdit-title">显示字段</div>
        <Button type="dashed" icon="plus"
          onClick={handleTableAdd}>
          添加字段
        </Button>
        <br /><br />
        {renderItemsOptions(table, handleTableChange, handleTableDel)}
      </>
    ) : null}
    {style ? (
      <>
        <div className="ZEleA-DnDFormEdit-title">样式</div>
        {renderStyleOptions(style, handleStyleChange)}
      </>
    ) : null}
  </Drawer>
}