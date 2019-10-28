import React from 'react';
import { Drawer, Button, Select } from 'antd';

import ItemEdit from './components/ItemEdit';
import { renderBaseOptions, renderStyleOptions, renderAdvancedOptions } from './components/render';

import '../index.css';
import RequiredCheckbox from './components/RequiredCheckbox';

const { Option } = Select;

function renderItemsOptions(items, handle, otherProps = {}) {
  return <ItemEdit
    items={items}
    {...handle}
    {...otherProps}
  />
}

function renderFieldsSelect(list, value, handleChange) {
  return <Select style={{ width: '100%' }}
    value={value}
    onChange={handleChange}
  >
    {list.map((item, i) => {
      return <Option key={i} value={item}>{item}</Option>
    })}
  </Select>
}

export default ({ current, dispatch, fields }) => {
  const { options = {} } = current;
  const {
    field = {}, base = {}, rules = {}, style,
    items, advanced, config, table
  } = options;

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
  function handleFieldChange(value) {
    field.value = value;
    onSave();
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

  function handleTableAdd() {
    table.push({
      label: `字段${table.length + 1}`,
      value: `f_${table.length + 1}`,
      options: {
        type: 'plain',
        echoAdd: true,
        echoEdit: true,
      }
    });
    onSave();
  }
  function handleTableChange(i, type, e) {
    table[i][type] = e.target.value;
    onSave();
  }
  function handleTableOptionsChange(i, type, value) {
    table[i].options[type] = value;
    onSave();
  }
  function handleTableDel(i) {
    table.splice(i, 1);
    onSave();
  }
  function handleRulesChange(key, value) {
    rules[key].value = value;
    onSave();
  }

  /**
   * 实际上是修改了 config 的 options
   *
   * @param {string} key
   * @param {event} e
   */
  function handleConfigChange(key, e) {
    config[key].value = e.target.value;
    onSave();
  }

  return <Drawer
    visible={Boolean(current.id)}
    mask={false}
    onClose={handleClose}
  >
    <div className="ZEleA-DnDFormEdit-title">基本属性</div>
    <RequiredCheckbox
      data={rules}
      onChange={handleRulesChange}
    />
    <div className="ZEleA-DnDFormEdit-title">字段值</div>
    {renderFieldsSelect(fields, field.value, handleFieldChange)}
    {renderBaseOptions(base, handleBaseChange)}
    {items ? (
      <>
        <div className="ZEleA-DnDFormEdit-title">子项</div>
        <Button type="dashed" icon="plus"
          onClick={handleItemAdd}>
          添加子项
        </Button>
        <br /><br />
        {renderItemsOptions(items, {
          onChange: handleItemsChange,
          onRemove: handleItemDel
        })}
      </>
    ) : null}
    {config ?
      <>
        <div className="ZEleA-DnDFormEdit-title">配置</div>
        {renderBaseOptions(config, handleConfigChange)}
      </> : null}
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
        {renderItemsOptions(table,
          {
            onChange: handleTableChange,
            onRemove: handleTableDel,
            onOptionsChange: handleTableOptionsChange
          },
          {
            disabled: Boolean(base.path && base.path.value),
          }
        )}
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