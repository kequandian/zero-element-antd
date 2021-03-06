function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { Button } from 'antd';
import { query, post, update, remove, download } from 'zero-element/lib/utils/request';
import { message as msg } from 'antd';
const methodMap = {
  'get': query,
  'post': post,
  'put': update,
  'delete': remove,
  'download': download
};
export default function Request(props) {
  const {
    title = 'Request',
    options,
    className,
    namespace,
    handle,
    ...restProps
  } = props;
  const {
    method = 'get',
    message = '操作成功',
    API,
    data = {},
    buttonProps = {},
    ...rest
  } = options;
  const [loading, setLoading] = useState(false);

  function handleClick() {
    const match = methodMap[method];

    if (!API) {
      console.warn('action-request 缺少必要的参数 : API');
      return;
    }

    setLoading(true);

    if (method === 'download') {
      return download(API, {
        method: options.downloadMethod,
        fileName: options.fileName
      }).then(_ => {
        setLoading(false);

        if (message) {
          msg.success(message);
        }

        if (typeof handle.onRefresh === 'function') {
          handle.onRefresh();
        }
      }).finally(_ => setLoading(false));
    } else {
      match(API, data).then(_ => {
        setLoading(false);

        if (message) {
          msg.success(message);
        }

        if (typeof handle.onRefresh === 'function') {
          handle.onRefresh();
        }
      }).finally(_ => setLoading(false));
    }
  }

  return /*#__PURE__*/React.createElement(Button, _extends({
    className: className,
    onClick: handleClick
  }, buttonProps, {
    loading: loading
  }), title);
}