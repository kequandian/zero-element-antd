import React from 'react';
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
    fileName,
    downloadMethod,
    message
  } = options;

  function handleClick() {
    return download(API, {
      method: downloadMethod,
      fileName: fileName
    }).then(_ => {
      setLoading(false);

      if (message) {
        msg.success(message);
      }
    }).finally(_ => setLoading(false));
  }

  return /*#__PURE__*/React.createElement(Button, {
    onClick: handleClick,
    loading: loading
  }, title);
}