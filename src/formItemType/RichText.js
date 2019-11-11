import React, { useEffect, useState } from 'react';
import BraftEditor from 'braft-editor';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';

import 'braft-editor/dist/index.css';

export default (props) => {
  const { name, value, handle, onChange, props: p, ...rest } = props;
  const [editorState, setEditorState] = useState();

  useDidMount(_ => {
    handle.onFormatValue(name, 'html');
  });

  useEffect(_ => {
    setEditorState(BraftEditor.createEditorState(value));
  }, [value]);

  function handleChange(editorState) {
    setEditorState(editorState);
    onChange(editorState);
  }

  return <BraftEditor
    name={name}
    {...rest}
    {...p}
    value={editorState}
    onChange={handleChange}
    placeholder="请输入内容"
  />
}