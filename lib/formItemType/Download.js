import React, { useState } from 'react';
import { Button } from 'antd';
import { download } from 'zero-element/lib/utils/request';
import { message as msg } from 'antd';
export default function (props) {
  const {
    options = {}
  } = props;
  const {
    title,
    API,
    url,
    fileName,
    downloadMethod = 'get',
    message
  } = options;
  const [loading, setLoading] = useState(false);

  function handleClick() {
    if (url) {
      const link = document.createElement("a");
      const evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", false, false);
      link.href = url;

      if (fileName) {
        link.download = fileName;
      }

      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
    }

    if (API) {
      setLoading(true);
      download(API, {
        method: downloadMethod,
        fileName
      }, {}).then(_ => {
        if (message) {
          msg.success(message);
        }
      }).finally(_ => {
        setLoading(false);
      });
    }
  }

  return /*#__PURE__*/React.createElement(Button, {
    onClick: handleClick,
    loading: loading
  }, title);
}