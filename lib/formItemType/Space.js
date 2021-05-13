import React from "react";
export default function (props) {
  const {
    height
  } = props;
  console.log(height);
  return /*#__PURE__*/React.createElement('div', {
    style: {
      height: height
    }
  });
}