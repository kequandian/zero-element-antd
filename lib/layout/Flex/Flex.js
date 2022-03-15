function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import "./index.css";
const autoStyle = {
  display: 'flex',
  flex: 1
};

const Flex = props => {
  const {
    auto,
    align = 'center',
    justify = 'space-between',
    style = {},
    className = '',
    children,
    ...rest
  } = props;
  const defaultStyle = { ...style,
    alignItems: align,
    justifyContent: justify
  };
  const defaultClassName = `Zele-Layout-flex ${className}`;

  if (auto) {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: autoStyle,
      className: defaultClassName
    }, rest), React.Children.map(children, child => {
      return /*#__PURE__*/React.cloneElement(child, {
        auto
      });
    }));
  }

  return /*#__PURE__*/React.createElement("div", _extends({
    style: defaultStyle,
    className: defaultClassName
  }, rest), children);
};

export default Flex;