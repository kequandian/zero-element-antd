import React, { useEffect, useState } from 'react';
import BraftEditor from 'braft-editor';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';

import 'braft-editor/dist/index.css';

export default function RichText(props) {
  const { name, value, handle, onChange, props: p, ...rest } = props;
  const [editorState, setEditorState] = useState();

  useDidMount(_ => {
    handle.onFormatValue(name, 'html');
  });

  useEffect(_ => {
    if (value && typeof value === 'string') {
      setEditorState(BraftEditor.createEditorState(value));
    }
  }, [value]);

  if (editorState) {
    return <BraftEditor
      name={name}
      {...rest}
      {...p}
      defaultValue={editorState}
      onBlur={onChange}
      placeholder="请输入内容"
    />
  }
  return <BraftEditor
    name={name}
    {...rest}
    {...p}
    onBlur={onChange}
    placeholder="请输入内容"
  />
}