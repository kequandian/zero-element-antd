import React from 'react';
import { Tag } from 'antd';
import defaultMap from '../map/status.config';

export default function valueTypeTag(props) {
  const { options = {}, data: { text = '-' } } = props;
  const { color = {},Class={},map = {} } = options;
  return <Tag color={color[text] || '#108ee9'} className={Class[text]||'_tag_color_status_default'}>
    {map[text] || defaultMap[text] || text}
  </Tag>
}