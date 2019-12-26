import React, { useState } from 'react';
import BraftEditor from 'braft-editor';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import uploadFile from './uploadFile';

import 'braft-editor/dist/index.css';

export default function RichText(props) {
  const { name, value, handle, onChange, options, props: p, ...rest } = props;
  const { API = '/api/fs/uploadfile' } = options;
  const [canDo, setCanDo] = useState(false);
  const [braftEditor, setBraftEditor] = useState(BraftEditor.createEditorState(value));

  useDidMount(_ => {
    handle.onFormatValue(name, 'html');

    // 若服务器返回了诸如 <p class="media-wrap image-wrap"></p> 这样的字符串
    // 会导致 createEditorState 生成了一个异常的 braftEditor, 并进而引发其它错误
    // 故重新 toHTML, 重新生成 braftEditor
    setBraftEditor(
      BraftEditor.createEditorState(
        braftEditor.toHTML()
      )
    );
    setCanDo(true);

  });

  const media = {
    uploadFn: uploadFile.bind(null, API),
  };

  if (canDo) {
    return <BraftEditor
      name={name}
      {...rest}
      {...p}
      defaultValue={braftEditor}
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