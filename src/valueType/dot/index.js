import React from 'react';
import { Tag } from 'antd';
import defaultMap from '../map/status.config';
import './index.less';

export default function valueTypeDot(props) {
  const { options = {}, data: { text = '-' } } = props;
  const { color = {}, map = {} } = options;
  return <span className="ZEle-valueType-dot">
    <span className="dot" style={{ backgroundColor: color[text] }}></span>
    {map[text] || defaultMap[text] || text}
  </span>
}