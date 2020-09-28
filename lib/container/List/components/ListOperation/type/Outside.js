function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Button } from 'antd';
export default ((item, i, {
  index,
  record
}, onAction) => {
  const {
    options
  } = item;
  const {
    button
  } = options;

  if (button) {
    return /*#__PURE__*/React.createElement(Button, _extends({
      key: i
    }, button, {
      onClick: onAction.bind(null, item.type, item.options)
    }), item.title);
  }

  return /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "ZEleA-table-action-Outside-normal",
    onClick: onAction.bind(null, item.type, item.options)
  }, item.title);
});