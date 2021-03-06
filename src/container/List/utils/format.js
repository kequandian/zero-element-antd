import React from 'react';
import ListOperation from '../components/ListOperation';
import ListFieldsEdit from '../components/ListFieldsEdit';
import { Render } from 'zero-element/lib/config/valueType';
import global from 'zero-element/lib/config/global';

/**
 *
 * 统一 Table columns 的格式
 * @export
 * @param {array} fields 标准化的 fields
 * @param {array} operation 对该行的操作
 * @param {object} handle 传递给 ListOperation
 * @param {object} props 传递给 valueType 与 ListOperation
 * @param {array} records 可选, 处理 api 返回的 extra
 * @returns antd Table columns 和 sum width
 */
export function formatTableFields(fields = [], operation = [], handle, props = {}, records) {
  const { autoOperationFixed } = global;
  let operationCfg = {};
  let width = 0;
  let operationObj;

  const rst = fields.map((fieldCfg, i) => {
    const { field, label,
      valueType,
      render = valueTypeRender(valueType, fieldCfg, props, handle),
      ...rest
    } = fieldCfg;

    if (field === 'operation') {
      operationCfg = fieldCfg;
      return {};
    }
    if (typeof rest.width === 'number') {
      width += rest.width;
    }

    return {
      dataIndex: field,
      title: label,
      render,
      ...rest,
    };
  }).filter(fieldCfg => fieldCfg.dataIndex);

  if (operation.length > 0) {
    operationObj = {
      dataIndex: 'operation',
      align: 'right',
      ...(width > 0 ? {
        fixed: autoOperationFixed === true ? 'right' : undefined,
        width: 100,
      } : {}),
      ...operationCfg, // fixed  width 
      title: handle.onFieldsOrder ?
        () => <ListFieldsEdit
          fields={props.fields}
          handle={handle}
          namespace={props.namespace}
        />
        : '操作',
      render: (text, record, index) => {
        return <ListOperation
          {...props}
          text={text}
          record={record}
          index={index}
          operation={operation}
          handle={handle}
        />;
      },
    };
    // rst.push(operationObj);
  }

  if (Array.isArray(records)) {
    appendFromExtra(rst, records);
  }

  return {
    columns: operationObj ? [...rst, operationObj] : [...rst],
    width,
  };
}
function valueTypeRender(type, config, props, handle) {
  if (type === null) {
    return undefined;
  }
  return (text, record, index) => <Render
    n={type || 'plain'}
    {...config}
    {...props}
    data={{
      text,
      record,
      index,
      type,
    }}
    handle={handle}
  />;
}
/**
 * 
 * @param {array} rst 
 * @param {array} records 
 */
function appendFromExtra(rst, records) {
  const sort = [];
  const map = {};
  records.forEach(record => {
    if (record && record.extra && Array.isArray(record.extra.items)) {
      record.extra.items.forEach(item => {
        if (item && item.attributeId !== undefined && !map[item.attributeId]) {
          map[item.attributeId] = true;
          sort.push({
            title: item.fieldName,
            dataIndex: ['extra', 'items', String(sort.length), 'value'],
          });
        }
      })
    }
  });

  rst.push(...sort);
  return rst;
}