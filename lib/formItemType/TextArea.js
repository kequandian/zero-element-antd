function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Input } from 'antd';
import Toptips from "./Toptips";
export default (({
  props = {},
  svg,
  placement,
  trigger,
  toptips,
  ...rest
}) => {
  // antd 的 TextArea 用在模态框里有闪烁的问题
  // 已修复, 原因是使用了样式 * { transition： all .3s }
  return toptips ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input.TextArea, _extends({
    style: {
      minWidth: "400px"
    },
    autoSize: {
      minRows: 2
    }
  }, rest, props)), /*#__PURE__*/React.createElement(Toptips, {
    content: toptips,
    svg: svg,
    placement: placement,
    trigger: trigger
  })) : /*#__PURE__*/React.createElement(Input.TextArea, _extends({
    style: {
      minWidth: "400px"
    },
    autoSize: {
      minRows: 2
    }
  }, rest, props));
});