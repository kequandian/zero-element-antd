function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
export default (({
  props,
  value,
  defaultValue,
  ...rest
}) => {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontSize: 16,
      color: '#2a5e90',
      display: 'flex',
      alignItems: 'center'
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 5,
      height: 15,
      backgroundColor: '#2a5e90',
      marginRight: '1em',
      marginTop: 4,
      marginLeft: -40,
      opacity:.5
    }
  }), /*#__PURE__*/React.createElement("div", null, value || defaultValue));
});