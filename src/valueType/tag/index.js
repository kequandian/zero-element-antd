import React from 'react';
import { Tag } from 'antd';
import config from './tag.config';

export default function valueTypeTag(props) {
  const { options = {}, data: { text = '' } } = props;
  const { colorMap = {} } = options;
  return <Tag color={colorMap[text] || config[text] || '#108ee9'}>{text}</Tag>
}