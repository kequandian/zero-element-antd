import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

export default ({ props = {}, ...rest }) => {
  const { autoSize = {} } = props;
  const { minRows = 2 } = autoSize;

  // antd 的 TextArea 用在模态框里有闪烁的问题
  // 已修复, 原因是使用了样式 * { transition： all .3s }

  return <Input.TextArea
    autoSize={{
      minRows: 2,
    }}
    {...rest}
    {...props}
  />
}