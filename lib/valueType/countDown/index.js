import React from 'react';
import { Statistic } from 'antd';
import moment from 'moment';
const {
  Countdown
} = Statistic;
export default function valueTypeCountDown(props) {
  const {
    options = {},
    data: {
      text,
      record
    }
  } = props;
  const {
    format = 'YYYY-MM-DD',
    echoFormat = 'HH:mm:ss',
    autoHide = true
  } = options;
  const countdownValue = moment(text, format);
  const isCountdownEnd = moment.unix(new Date()) > moment.unix(countdownValue);
  console.log(123, moment.unix(countdownValue), moment.unix(new Date()));

  if (autoHide && isCountdownEnd) {
    return '-';
  }

  return /*#__PURE__*/React.createElement(Countdown, {
    value: countdownValue,
    format: echoFormat
  });
}