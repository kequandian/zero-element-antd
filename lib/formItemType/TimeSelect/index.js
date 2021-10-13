function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState } from 'react';
import { Radio, DatePicker } from 'antd';
import selectTime from "./selectTime";
import moment from 'moment';
const {
  RangePicker
} = DatePicker;
export default (({
  props,
  onChange,
  ...rest
}) => {
  const {
    value
  } = props;

  function momentDate(date) {
    return moment(new Date(date), "YYYY-MM-DD");
  }

  const [theValue, setValue] = useState(momentDate(value));

  function handleChange(e) {
    console.log(e.target.value);
    let newValue = momentDate(e.target.value);
    let newValueGroup;

    if (e.target.value.indexOf("~") !== -1) {
      newValueGroup = e.target.value.split("~");
      newValueGroup.map((item, i) => {
        newValueGroup[i] = momentDate(item);
      });
      newValue = newValueGroup;
    }

    console.log(newValue);
    setValue(newValue);
    onChange(e.target.value);
  }

  function PickerChange(e) {
    let newValue = e;
    console.log(e);
    setValue(newValue);
    console.log(theValue);

    if (Array.isArray(newValue)) {
      onChange(moment(newValue[0]).format("YYYY/MM/DD") + "~" + moment(newValue[1]).format("YYYY/MM/DD"));
    } else {
      onChange(moment(newValue).format("YYYY/MM/DD"));
    }
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Radio.Group, _extends({}, rest, props, {
    onChange: handleChange,
    buttonStyle: "solid"
  }), /*#__PURE__*/React.createElement(Radio.Button, {
    value: selectTime("Today")
  }, "\u4ECA\u65E5"), /*#__PURE__*/React.createElement(Radio.Button, {
    value: selectTime("Week")
  }, "\u672C\u5468"), /*#__PURE__*/React.createElement(Radio.Button, {
    value: selectTime("Month")
  }, "\u672C\u6708"), /*#__PURE__*/React.createElement(Radio.Button, {
    value: selectTime("Quarter")
  }, "\u672C\u5B63\u5EA6"), /*#__PURE__*/React.createElement(Radio.Button, {
    value: selectTime("Year")
  }, "\u4ECA\u5E74"), /*#__PURE__*/React.createElement(Radio.Button, {
    value: "1970/01/01"
  }, "\u81EA\u5B9A\u4E49\u65F6\u95F4"), /*#__PURE__*/React.createElement(Radio.Button, {
    value: "1970/01/01~2999/12/31"
  }, "\u81EA\u5B9A\u4E49\u65F6\u95F4\u8303\u56F4")), Array.isArray(theValue) ? /*#__PURE__*/React.createElement(RangePicker, {
    key: theValue + "Range",
    defaultValue: theValue,
    onChange: val => PickerChange(val)
  }) : /*#__PURE__*/React.createElement(DatePicker, {
    key: theValue + "Date",
    defaultValue: theValue,
    onChange: val => PickerChange(val)
  }));
});