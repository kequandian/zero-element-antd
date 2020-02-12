export default [
  {
    title: '纯文本', type: 'Plain', options: {
      field: {},
      base: {
        label: {
          label: '字段名',
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
        fontSize: {
          label: '字号',
          type: 'radio',
          options: [
            { label: '小', value: '12px' },
            { label: '默认', value: '14px' },
            { label: '中', value: '16px' },
            { label: '大', value: '18px' },
          ],
          value: '14px',
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
      expect: {},
    }
  },
  {
    title: '输入下横线', type: 'InputUnderline', options: {
      field: {},
      base: {
        label: {
          label: '字段名',
        },
        value: {
          label: '内容',
          value: '',
        },
      },
      rules: {
        required: {
          label: '必填',
          value: undefined,
        },
      },
      expect: {},
    }
  },
  {
    title: '多选框', type: 'Checkbox', options: {
      field: {},
      base: {
        label: {
          label: '字段名',
        },
        // value: {
        //   label: '默认值',
        //   value: '1',
        // }
      },
      items: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 }
      ],
      rules: {
        required: {
          label: '必填',
          value: undefined,
        },
      },
      expect: {},
    }
  },
  {
    title: '分组', type: 'Group', options: {
      field: {},
      base: {
        value: {
          label: '分组名',
          value: '分组',
        },
      },
      expect: {},
    }
  },
  {
    title: '二维码', type: 'Group', options: {
      field: {},
      base: {
        value: {
          label: '二维码',
          value: '二维码',
        },
      },
      expect: {},
    }
  },
  {
    title: '条形码', type: 'Group', options: {
      field: {},
      base: {
        value: {
          label: '条形码',
          value: '条形码',
        },
      },
      expect: {},
    }
  },
  {
    title: '图片', type: 'Image', options: {
      field: {},
      base: {
        value: {
          label: '图片URL',
          value: '图片',
        },
      },
      expect: {},
    }
  },
];