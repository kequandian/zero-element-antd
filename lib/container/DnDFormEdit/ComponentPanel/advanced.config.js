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
}, {
  title: '模态框-列表单选',
  type: 'ModalRadio',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      }
    },
    config: {
      title: {
        label: '引导文本',
        value: '选择数据'
      },
      label: {
        label: '展示文本'
      },
      editLabel: {
        label: '编辑时展示文本'
      },
      value: {
        label: '提交的字段'
      },
      API: {
        label: 'API'
      },
      fields: {
        label: '弹出模态框中列表字段',
        type: 'tableField',
        value: [{
          label: '名称',
          field: 'name'
        }, {
          label: '性别',
          field: 'sex'
        }]
      }
    },
    rules: {
      required: {
        label: '必填',
        value: undefined
      }
    }
  }
}, {
  title: '输入框-数据校验',
  type: 'Input',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      }
    },
    rules: {
      required: {
        label: '必填',
        value: undefined
      },
      mail: {
        label: '邮箱',
        value: undefined,
        message: '请输入正确的邮箱格式'
      },
      phone: {
        label: '手机号码',
        value: undefined,
        message: '请输入正确的手机号码格式'
      }
    }
  }
}];
exports["default"] = _default;