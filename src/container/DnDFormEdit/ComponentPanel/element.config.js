export default [
  {
    title: '纯文本', type: 'Plain', options: {
      base: {
        label: {
          label: '字段名',
        },
        field: {
          label: '字段值',
        },
        value: {
          label: '文本',
          value: '纯文本',
        },
      },
      style: {
        color: {
          label: '颜色',
          value: '#666666',
        },
        textAlign: {
          label: '对齐',
          type: 'radio',
          options: [
            { label: '左', value: 'left' },
            { label: '中', value: 'center' },
            { label: '右', value: 'right' },
          ],
          value: 'left',
        },
        padding: {
          label: '内间距',
          value: '0px 0px 0px 0px',
        },
        margin: {
          label: '外间距',
          value: '0px 0px 0px 0px',
        },
      },
    }
  },
  {
    title: '输入框', type: 'Input', options: {
      base: {
        label: {
          label: '字段名',
        },
        field: {
          label: '字段值',
        },
        value: {
          label: '内容',
          value: '',
        },
        placeholder: {
          label: '占位符',
          value: '请输入……',
        },
      },
    }
  },
  {
    title: '单选框', type: 'Radio', options: {
      base: {
        label: {
          label: '字段名',
        },
        field: {
          label: '字段值',
        },
        value: {
          label: '默认值',
          value: '1',
        }
      },
      items: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' }
      ],
    }
  },
  {
    title: '多选框', type: 'Checkbox', options: {
      base: {
        label: {
          label: '字段名',
        },
        field: {
          label: '字段值',
        },
        value: {
          label: '默认值',
          value: '1',
        }
      },
      items: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' }
      ],
    }
  },
];