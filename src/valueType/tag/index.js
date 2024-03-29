import React from 'react';
import { Tag } from 'antd';
import defaultMap from '../map/status.config';
import '../../rewrite.less'

export default function valueTypeTag(props) {
  const { options = {}, data: { text = '-' },theme,type,state} = props;
  const { map = {},chy = {},colorMap={},weight,fontColor } = options;
  return <Tag className={colorMap[text]?'':`_tag_color ${theme} ${type} ${state||chy[text]}`||`_tag_color tag`} style={{"background":colorMap[text],"color":fontColor||"#fff","fontWeight":weight}}>
    {map[text] || defaultMap[text] || text}
  </Tag>
}