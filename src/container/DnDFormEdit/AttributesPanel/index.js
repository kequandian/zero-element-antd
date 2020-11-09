import React from 'react';
import { Drawer, Button, Select } from 'antd';
import { toNumber } from '@/utils/tool';
import ItemEdit from './components/ItemEdit';
import { arrayItemMove } from '@/utils/tool';
import { renderBaseOptions, renderStyleOptions, renderAdvancedOptions } from './components/render';
import { PlusOutlined } from '@ant-design/icons';

import Checkbox from './components/Checkbox';
import Expect from './components/Expect';

import SearchItems from './Attributes/SearchItems';

import '../index.css';

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

export default ({ current, dispatch, fields, API }) => {
  const { options = {} } = current;
  const {
    field = {}, base = {}, rules = {}, style,
    items, advanced, config, table,
    searchItems,
    expect,
    pdf,
  } = options;
  const { required, ...restRules } = rules;

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
    base[key].value = toNumber(e.target.value);
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
  function handleItemChange(i, type, e) {
    items[i][type] = toNumber(e.target.value);
    onSave();
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  function handleItemIndexChange(type, index) {
    arrayItemMove(items, type, index);
    onSave();
  }
  function handleItemDel(i) {
    items.splice(i, 1);
    onSave();
  }

  function handleTableAdd(pdf) {
    table.push({
      label: `字段${table.length + 1}`,
      value: `f_${table.length + 1}`,
      options: {
        type: 'plain',
        ...(pdf ? {} : {
          echoAdd: true,
          echoEdit: true,
          echoType: true,
        }),
      }
    });
    onSave();
  }
  function handleTableChange(i, type, e) {
    table[i][type] = e.target.value;
    onSave();
  }
  function handleTableIndexChange(type, index) {
    arrayItemMove(table, type, index);
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
  function handleRulesMsgChange(key, value) {
    rules[key].message = value;
    onSave();
  }
  function handleExpectChange(key, value) {
    if (!expect[key]) {
      expect[key] = {};
    }
    expect[key].value = toNumber(value);
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
    <Checkbox
      field="required"
      data={required}
      onChange={handleRulesChange}
    />
    <div className="ZEleA-DnDFormEdit-title">字段值(后端字段)</div>
    {renderFieldsSelect(fields, field.value, handleFieldChange)}
    {renderBaseOptions(base, handleBaseChange)}
    {Object.keys(restRules).length ? (
      <>
        <div className="ZEleA-DnDFormEdit-title">数据校验</div>
        {Object.keys(restRules).map(key => {
          return <Checkbox
            key={key}
            field={key}
            data={restRules[key]}
            onChange={handleRulesChange}
            onMsgChange={handleRulesMsgChange}
          />
        })}
      </>
    ) : null}
    {items ? (
      <>
        <div className="ZEleA-DnDFormEdit-title">子项</div>
        <Button type="dashed" icon={<PlusOutlined />}
          onClick={handleItemAdd}>
          添加子项
        </Button>
        <br /><br />
        {renderItemsOptions(items, {
          onChange: handleItemChange,
          onRemove: handleItemDel,
          onIndexChange: handleItemIndexChange,
        })}
      </>
    ) : null}
    <SearchItems data={searchItems} onSave={onSave} />
    {config ?
      <>
        <div className="ZEleA-DnDFormEdit-title">配置</div>
        {renderBaseOptions(config, handleConfigChange)}
      </> : null}
    {expect ?
      <>
        <div className="ZEleA-DnDFormEdit-title">预期</div>
        <Expect
          data={expect}
          onChange={handleExpectChange}
        />
      </>
      : null}
    {advanced ? (
      <>
        <div className="ZEleA-DnDFormEdit-title">高级</div>
        {renderAdvancedOptions(advanced, options, {
          onAdvancedChange: handleAdvancedChange,
          onSave,
        }, {
          API,
        }
        )}
      </>
    ) : null}
    {table ? (
      <>
        <div className="ZEleA-DnDFormEdit-title">显示字段</div>
        <Button type="dashed" icon={<PlusOutlined />}
          onClick={handleTableAdd.bind(null, pdf)}>
          添加字段
        </Button>
        <br /><br />
        {renderItemsOptions(table,
          {
            onChange: handleTableChange,
            onRemove: handleTableDel,
            onOptionsChange: handleTableOptionsChange,
            onOptionsChange: handleTableOptionsChange,
            onIndexChange: handleTableIndexChange,
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