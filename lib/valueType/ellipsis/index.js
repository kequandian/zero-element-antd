import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
export default function valueTypeEllipsis(props) {
  const {
    field,
    options = {},
    data: {
      index,
      text = '',
      record
    }
  } = props;
  const {
    max = 16,
    textTemp,
    textTempFields,
    textTempNull = ''
  } = options;
  const [t, setT] = useState(text);
  useEffect(_ => {
    if (textTemp && Array.isArray(textTempFields)) {
      let rst = textTemp;
      textTempFields.forEach(key => {
        const v = record[key];
        const toValue = v || v === 0 ? v : textTempNull;
        rst = rst.replace(`{${key}}`, toValue);
      });
      setT(rst);
    } else {
      setT(String(text));
    }
  }, [text, textTemp]);
  if (!t || t === 'null') return null;
  return t.length < max ? t : /*#__PURE__*/React.createElement(Tooltip, {
    title: t
  }, t.slice(0, max), "...");
}