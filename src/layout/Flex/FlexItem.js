import React from 'react';

const autoStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const FlexItem = ({ auto, children, style = {}, className = '', flex = '0 1 auto', ...rest }) => {
  const defaultStyle = {
    ...style,
    flex,
  }
  const defaultClassName = className;
  if (auto) {
    return <div style={{
      ...autoStyle,
      ...defaultStyle,
    }}
      className={defaultClassName}
      {...rest}
    >
      {children}
    </div>
  }

  return <div style={defaultStyle} className={defaultClassName} {...rest}>
    {children}
  </div>
}
export default FlexItem;