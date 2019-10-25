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
      },
      path: {
        label: '跳转的页面',
        type: 'input',
        value: ''
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
      },
      field: {
        label: '绑定的字段(用于 xml 文件)',
        type: 'selectTableField',
        value: ''
      }
    },
    table: [{
      label: '名称',
      value: 'name',
      options: {
        type: 'plain',
        // plain input number date ...
        echoAdd: true,
        echoEdit: true
      }
    }]
  }
}, {
  title: '下拉框-数字字典',
  type: 'SelectField',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      }
    },
    config: {
      field: {
        label: '数字字典字段'
      }
    },
    rules: {
      required: {
        label: '必填',
        value: undefined
      }
    }
  }
}];
exports["default"] = _default;