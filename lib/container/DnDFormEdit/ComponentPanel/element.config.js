"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = [{
  title: '纯文本',
  type: 'Plain',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      },
      value: {
        label: '文本',
        value: '纯文本'
      }
    },
    style: {
      color: {
        label: '颜色',
        value: '#666666'
      },
      textAlign: {
        label: '对齐',
        type: 'radio',
        options: [{
          label: '左',
          value: 'left'
        }, {
          label: '中',
          value: 'center'
        }, {
          label: '右',
          value: 'right'
        }],
        value: 'left'
      },
      fontSize: {
        label: '字号',
        type: 'radio',
        options: [{
          label: '小',
          value: '12px'
        }, {
          label: '默认',
          value: '14px'
        }, {
          label: '中',
          value: '16px'
        }, {
          label: '大',
          value: '18px'
        }],
        value: '14px'
      },
      padding: {
        label: '内间距',
        value: '0px 0px 0px 0px'
      },
      margin: {
        label: '外间距',
        value: '0px 0px 0px 0px'
      }
    }
  }
}, {
  title: '输入框',
  type: 'Input',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      },
      // value: {
      //   label: '内容',
      //   value: '',
      // },
      placeholder: {
        label: '占位符',
        value: '请输入……'
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
  title: '日期',
  type: 'Date',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      },
      placeholder: {
        label: '占位符',
        value: '请选择日期'
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
  title: '单选框',
  type: 'Radio',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      } // value: {
      //   label: '默认值',
      //   value: '1',
      // }

    },
    items: [{
      label: '选项1',
      value: 1
    }, {
      label: '选项2',
      value: 2
    }],
    rules: {
      required: {
        label: '必填',
        value: undefined
      }
    }
  }
}, {
  title: '多选框',
  type: 'Checkbox',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      } // value: {
      //   label: '默认值',
      //   value: '1',
      // }

    },
    items: [{
      label: '选项1',
      value: 1
    }, {
      label: '选项2',
      value: 2
    }],
    rules: {
      required: {
        label: '必填',
        value: undefined
      }
    }
  }
}, {
  title: '下拉框',
  type: 'Select',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      }
    },
    items: [{
      label: '选项1',
      value: 1
    }, {
      label: '选项2',
      value: 2
    }],
    rules: {
      required: {
        label: '必填',
        value: undefined
      }
    }
  }
}, {
  title: '文本域',
  type: 'TextArea',
  options: {
    field: {},
    base: {
      label: {
        label: '字段名'
      },
      placeholder: {
        label: '占位符',
        value: '请输入……'
      },
      minRows: {
        label: '最小行数',
        value: 2
      },
      maxRows: {
        label: '最大行数'
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
  title: '隐藏域',
  type: 'Hidden',
  options: {
    field: {},
    base: {
      value: {
        label: '提交的数据',
        value: ''
      }
    }
  }
}];
exports["default"] = _default;