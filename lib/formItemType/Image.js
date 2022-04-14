function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import ImageView from "../components/ImageView";
export default function Image(props) {
  const {
    value,
    options
  } = props;
  let imageList = value;

  if (imageList && imageList.indexOf(',') != -1) {
    imageList = imageList.split(',');
  }

  return /*#__PURE__*/React.createElement(ImageView, _extends({}, options, {
    value: imageList
  }));
}