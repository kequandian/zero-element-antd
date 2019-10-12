import React from 'react';
import { Tag } from 'antd';
import config from './tag.config';
import defaultMap from '../status/status.config';

export default function valueTypeTag(props) {
  const { options = {}, data: { text = '' } } = props;
  const { colorMap = {}, map = {} } = options;
  return <Tag color={colorMap[text] || config[text] || '#108ee9'}>
    {map[text] || defaultMap[text] || text}
  </Tag>
}