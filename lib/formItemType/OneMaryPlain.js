import React from 'react';
import { Space, Table, Tag } from 'antd';
export default (props => {
  const {
    name,
    props: propsOtp,
    defaultValue,
    value,
    options = {},
    ...rest
  } = props;
  const {
    fields
  } = options;
  const columns = [];
  fields.map(item => {
    const newItem = {
      title: item.label,
      dataIndex: item.field,
      key: item.field
    };
    columns.push(newItem);
  });
  return /*#__PURE__*/React.createElement(Table, {
    style: {
      width: '100%'
    },
    columns: columns,
    dataSource: value,
    pagination: {
      position: ['none', 'none']
    }
  });
});