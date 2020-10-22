import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default ({ props = {}, ...rest }) => {
  const { autoSize = {} } = props;
  const { minRows = 2 } = autoSize;

  // antd 的 TextArea 用在模态框里有闪烁的问题
  // 暂时用回原生文本域
  return <textarea
    className="ant-input"
    rows={minRows}
    {...rest}
  />

  return <Input.TextArea
    autoSize={{
      minRows: 2,
    }}
    {...rest}
    {...props}
  />
}