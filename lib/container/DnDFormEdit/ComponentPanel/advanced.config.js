"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = [{
  title: '一对多关系',
  type: 'OneMany',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      }
    },
    advanced: {
      sql: {
        label: '关联的 SQL 文件',
        type: 'selectSQL',
        value: ''
      },
      tableName: {
        label: '关联的表',
        type: 'selectTable',
        value: ''
      }
    },
    table: [// { label: '名称', value: 'name' },
      // { label: '性别', value: 'sex' },
    ]
  }
}];
exports["default"] = _default;