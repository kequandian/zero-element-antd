import React, { useRef, useMemo } from 'react';
import BraftEditor from 'braft-editor';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import uploadFile from './uploadFile';

import 'braft-editor/dist/index.css';

export default function RichText(props) {
  const { name, value, handle, onChange, options, props: p, ...rest } = props;
  const { API = '/api/fs/uploadfile' } = options;
  const esRef = useRef(null);
  const defaultValue = useMemo(_ => BraftEditor.createEditorState(value));

  useDidMount(_ => {
    handle.onFormatValue(name, 'html');
  });

  const media = {
    uploadFn: uploadFile.bind(null, API),
  };

  return <BraftEditor
    name={name}
    {...rest}
    {...p}
    defaultValue={defaultValue}
    media={media}
    ref={esRef}
    onBlur={onChange}
    placeholder="请输入内容"
  />
}