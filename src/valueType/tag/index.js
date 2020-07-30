import React from 'react';
import { Tag } from 'antd';
import config from './tag.config';
import defaultMap from '../map/status.config';

export default function valueTypeTag(props) {
  const { options = {}, data: { text = '' } } = props;
  const { color = {}, map = {} } = options;
  return <Tag color={color[text] || config[text] || '#108ee9'}>
    {map[text] || defaultMap[text] || text}
  </Tag>
}