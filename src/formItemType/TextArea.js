import React from 'react';
import { Input } from 'antd';
import Toptips from './Toptips'

export default ({ props = {},
  svg,
  placement,
  trigger,
  toptips, ...rest }) => {

  // antd 的 TextArea 用在模态框里有闪烁的问题
  // 已修复, 原因是使用了样式 * { transition： all .3s }

  return toptips?<>
  <Input.TextArea
  style={{
    minWidth:"400px"
  }}
    autoSize={{
      minRows: 2,
    }}
    {...rest}
    {...props}
  />
  <Toptips content={toptips} svg={svg} placement={placement} trigger={trigger}></Toptips>
  </>:<Input.TextArea
  style={{
    minWidth:"400px"
  }}
    autoSize={{
      minRows: 2,
    }}
    {...rest}
    {...props}
  />
}