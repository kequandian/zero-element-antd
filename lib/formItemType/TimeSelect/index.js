function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Radio } from 'antd';
import selectTime from "./selectTime";
export default (({
  props,
  onChange,
  ...rest
}) => {
  function handleChange(e) {
    console.log(e.target.value);
    onChange(e.target.value);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Radio.Group, _extends({}, rest, props, {
    onChange: handleChange,
    buttonStyle: "solid"
  }), /*#__PURE__*/React.createElement(Radio.Button, {
    value: selectTime("Today")
  }, "\u4ECA\u65E5"), /*#__PURE__*/React.createElement(Radio.Button, {
    value: selectTime("Week")
  }, "\u672C\u5468"), /*#__PURE__*/React.createElement(Radio.Button, {
    value: selectTime("Month")
  }, "\u672C\u6708"), /*#__PURE__*/React.createElement(Radio.Button, {
    value: selectTime("Quarter")
  }, "\u672C\u5B63\u5EA6"), /*#__PURE__*/React.createElement(Radio.Button, {
    value: selectTime("Year")
  }, "\u4ECA\u5E74")));
});