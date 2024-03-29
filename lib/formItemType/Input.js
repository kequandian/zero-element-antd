function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Input } from 'antd';
import Toptips from "./Toptips";
export default (({
  props,
  svg,
  placement,
  trigger,
  toptips,
  width = "240px",
  ...rest
}) => {
  return toptips ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, _extends({
    style: {
      width: width
    }
  }, props, rest)), /*#__PURE__*/React.createElement(Toptips, {
    content: toptips,
    svg: svg,
    placement: placement,
    trigger: trigger
  })) : /*#__PURE__*/React.createElement(Input, _extends({
    style: {
      width: width
    }
  }, props, rest));
});