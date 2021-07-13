function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Space } from 'antd';
import { Render } from 'zero-element/lib/config/valueType';
import _ from 'lodash';
/**
 * 2021-7-13
 * @param {size} 间距属性 'small' | 'middle' | 'large' | number
 */

export default function valueTypeComplex(props) {
  const {
    options,
    handle,
    data: {
      index,
      record
    }
  } = props;
  const {
    fields,
    direction = 'horizontal',
    size = 'small'
  } = options;
  return /*#__PURE__*/React.createElement(Space, {
    direction: direction,
    size: size
  }, fields.map((field, i) => {
    const {
      type
    } = field;
    return /*#__PURE__*/React.createElement(Render, _extends({
      key: field.field,
      n: type
    }, field, props, {
      data: {
        text: _.get(record, field.field),
        record,
        index,
        type
      },
      handle: handle,
      options: fields[i] && fields[i].options || {}
    }));
  }));
}