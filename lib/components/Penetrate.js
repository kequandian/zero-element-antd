import React from 'react';
export default function Penetrate({
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, React.Children.toArray(children).map(child => /*#__PURE__*/React.cloneElement(child, rest)));
}