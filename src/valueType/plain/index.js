import React, { useEffect, useState } from 'react';
import { formatAPI } from 'zero-element/lib/utils/format';

export default function valueTypePlain(props) {
  const { namespace, options = {}, data: { index, text = '', record }, } = props;
  const { style, format, placeholder = '' } = options;
  const [t, setT] = useState([]);

  useEffect(_ => {
    if (format) {
      const rst = [];
      if (Array.isArray(format)) {
        format.forEach(f => {
          rst.push(formatAPI(f, { namespace, placeholder, data: record }))
        })
      } else {
        rst.push(formatAPI(f, { namespace, placeholder, data: record }))
      }
      setT(rst);

    } else {
      setT([String(text)]);
    }
  }, [record, format]);

  if (format) {
    return <div>
      {t.map((text, i) => <div key={i}>{text}</div>)}
    </div>
  }
  return <span style={style}>{text}</span>
}