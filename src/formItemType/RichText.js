import React from 'react';
import BraftEditor from 'braft-editor';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';

import 'braft-editor/dist/index.css';

export default (props) => {
  const { name, handle, props: p, ...rest } = props;

  useDidMount(_ => {
    handle.onFormatValue(name, 'html');
  });

  return <BraftEditor
    name={name}
    {...rest}
    {...p}
    placeholder="请输入内容"
  />
}