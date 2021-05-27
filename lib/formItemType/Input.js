function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Input } from 'antd';
import Toptips from "./Toptips";
export default (({
  props,
  content,
  svg,
  placement,
  trigger,
  toptips,
  ...rest
}) => {
  return toptips ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, _extends({}, props, rest)), /*#__PURE__*/React.createElement(Toptips, {
    title: toptips,
    content: content,
    svg: svg,
    placement: placement,
    trigger: trigger
  })) : /*#__PURE__*/React.createElement(Input, _extends({}, props, rest));
});