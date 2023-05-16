import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { formatAPI } from 'zero-element/lib/utils/format';

export default function valueTypeEllipsis(props) {
  const {
    field,
    namespace,
    options = {},
    data: { index, text = '-', record },
  } = props;
  const { max = 16, format, placeholder = '' } = options;
  const [t, setT] = useState(text === 0 ? 0 : String((text || '')));

  useEffect(_ => {
    if (format) {
      let rst = formatAPI(format, { namespace, placeholder, data: record });
      setT(rst);

    } else {
      setT(String(text));
    }
  }, [text, format]);

  if (!t || t === 'null') return '-';

  return t.length < max ? t : (
    <Tooltip title={t}>
      {t && t.slice(0, max)}...
    </Tooltip>
  )
}