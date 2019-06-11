"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = [{
  title: '纯文本',
  type: 'Plain',
  options: {
    base: {
      field: {
        label: '字段'
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
      }
    }
  }
}, {
  title: '输入框',
  type: 'Input',
  options: {
    base: {
      field: {
        label: '字段'
      },
      value: {
        label: '内容',
        value: '请输入……'
      }
    }
  }
}, {
  title: '单选框',
  type: 'Radio',
  options: {
    base: {
      field: {
        label: '字段'
      },
      value: {
        label: '默认值',
        value: '1'
      }
    },
    items: [{
      label: '选项1',
      value: '1'
    }, {
      label: '选项2',
      value: '2'
    }]
  }
}, {
  title: '多选框',
  type: 'Checkbox',
  options: {
    base: {
      field: {
        label: '字段'
      },
      value: {
        label: '默认值',
        value: '1'
      }
    },
    items: [{
      label: '选项1',
      value: '1'
    }, {
      label: '选项2',
      value: '2'
    }]
  }
}];
exports["default"] = _default;