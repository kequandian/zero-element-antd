function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
const autoStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const FlexItem = ({
  auto,
  children,
  style = {},
  className = '',
  flex = '0 1 auto',
  ...rest
}) => {
  const defaultStyle = { ...style,
    flex
  };
  const defaultClassName = className;

  if (auto) {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: { ...autoStyle,
        ...defaultStyle
      },
      className: defaultClassName
    }, rest), children);
  }

  return /*#__PURE__*/React.createElement("div", _extends({
    style: defaultStyle,
    className: defaultClassName
  }, rest), children);
};

export default FlexItem;