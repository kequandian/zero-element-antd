import React from 'react';
import { Button } from 'antd';

export default (props) => {
  const { data: { text = '', record }, options = {} } = props;
  const { fileName = '下载' } = options;

  if (Array.isArray(text)) {
    return text.map((item, i) => {
      return <Button type="link" size="small" key={item.id || i} href={item.url} >{item.name}</Button>
    })
  }

  if (text) {
    return <Button type="link" size="small" href={text} >{record[fileName] || fileName}</Button>;
  }
  return '无';
}