export default [
  {
    title: '一对多关系', type: 'OneMany', options: {
      base: {
        label: {
          label: '字段名',
        },
        field: {
          label: '字段值',
        },
      },
      advanced: {
        sql: {
          label: '关联的 SQL 文件',
          type: 'selectSQL',
          value: '',
        }
      },
      table: [
        { label: '名称', value: 'name' },
        { label: '性别', value: 'sex' },
      ],
    }
  },
];