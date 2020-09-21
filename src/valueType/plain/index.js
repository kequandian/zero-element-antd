import React, { useEffect, useState } from 'react';
import { formatAPI } from 'zero-element/lib/utils/format';
import './index.less';

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
        rst.push(formatAPI(format, { namespace, placeholder, data: record }))
      }
      setT(rst);

    } else {
      setT([String(text)]);
    }
  }, [record, format]);

  if (format) {
    return <div>
      {t.map((text, i) => {
        const rst = /^(?<label>\S+(:|：))(?<value>[\ \S]+)/.exec(text);
        if (rst && rst.groups) {
          const { groups } = rst;
          const { label, value } = groups;
          return <div className="ZEle-valueType-plain" key={i}>
            <span className="label">{label}</span>
            <span>{value}</span>
          </div>
        }
        return <div className="ZEle-valueType-plain">{text}</div>;
      })}
    </div>
  }
  return <span style={style}>{text}</span>
}