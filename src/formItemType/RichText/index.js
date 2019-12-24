import React, { useEffect, useState } from 'react';
import BraftEditor from 'braft-editor';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import uploadFile from './uploadFile';

import 'braft-editor/dist/index.css';

export default function RichText(props) {
  const { name, value, handle, onChange, options, props: p, ...rest } = props;
  const { API = '/api/fs/uploadfile' } = options;
  const [editorState, setEditorState] = useState();

  useDidMount(_ => {
    handle.onFormatValue(name, 'html');
  });

  useEffect(_ => {
    if (value && typeof value === 'string') {
      setEditorState(BraftEditor.createEditorState(value));
    }
  }, [value]);

  const media = {
    uploadFn: uploadFile.bind(null, API),
  };

  if (editorState) {
    return <BraftEditor
      name={name}
      {...rest}
      {...p}
      defaultValue={editorState}
      media={media}
      onBlur={onChange}
      placeholder="请输入内容"
    />
  }
  return <BraftEditor
    name={name}
    {...rest}
    {...p}
    media={media}
    onBlur={onChange}
    placeholder="请输入内容"
  />
}