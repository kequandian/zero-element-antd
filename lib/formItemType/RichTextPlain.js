import React from 'react';
export default (props => {
  const {
    name,
    props: propsOtp,
    defaultValue,
    value,
    ...rest
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: value
    }
  });
});