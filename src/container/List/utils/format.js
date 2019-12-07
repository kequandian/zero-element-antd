import React from 'react';
import ListOperation from '../components/ListOperation';
import { Render } from 'zero-element-global/lib/valueType';

/**
 *
 * 统一 Table columns 的格式
 * @export
 * @param {array} fields 标准化的 fields
 * @param {array} operation 对该行的操作
 * @param {object} handle 传递给 ListOperation
 * @param {object} props 传递给 valueType 与 ListOperation
 * @returns antd Table columns
 */
export function formatTableFields(fields = [], operation = [], handle, props = {}) {
  let operationCfg = {};
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

    return {
      dataIndex: field,
      title: label,
      render,
      ...rest,
    };
  }).filter(fieldCfg => fieldCfg.dataIndex);

  if (operation.length > 0) {
    rst.push({
      dataIndex: 'operation',
      align: 'right',
      ...operationCfg, // fixed  width
      title: '操作',
      // title: ListFieldsEdit,
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
    });
  }
  return rst;
}
function valueTypeRender(type, config, props, handle) {
  if (!type) return undefined;
  return (text, record, index) => <Render
    n={type}
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