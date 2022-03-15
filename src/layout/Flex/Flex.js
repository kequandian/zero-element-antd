import React from 'react';
import './index.css';

const autoStyle = {
  display: 'flex',
  flex: 1,
};
const Flex = (props) => {
  const {
    auto,
    align = 'center', justify = 'space-between',
    style = {}, className = '',
    children,
    ...rest
  } = props;
  const defaultStyle = {
    ...style,
    alignItems: align,
    justifyContent: justify,
  }
  const defaultClassName = `Zele-Layout-flex ${className}`;

  if (auto) {
    return <div style={autoStyle} className={defaultClassName} {...rest}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          auto,
        })
      })}
    </div>
  }

  return <div style={defaultStyle} className={defaultClassName} {...rest}>
    {children}
  </div>
}
export default Flex;