function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * 
 */
import React from 'react';
import { Switch } from 'antd';
export default function SelectWrapped(props) {
  const {
    value,
    options = [],
    onChange,
    props: p,
    ...rest
  } = props;

  function handleChange(value) {
    if (value === false) {
      value = 0;
    } else {
      value = 1;
    }

    onChange(value);
  }

  return /*#__PURE__*/React.createElement(Switch, _extends({
    onChange: handleChange,
    checked: value === 1 ? false : true
  }, rest, p));
}