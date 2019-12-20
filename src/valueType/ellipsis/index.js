import React from 'react';
import { Tooltip } from 'antd';

export default function valueTypeEllipsis(props) {
  const {
    field,
    options = {},
    data: { index, text = '', record },
  } = props;
  const { max = 30 } = options;
  const t = String(text);

  return t.length < max ? t : (
    <Tooltip title={t}>
      {t.slice(max)}...
    </Tooltip>
  )
}