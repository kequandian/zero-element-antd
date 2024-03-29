import React from 'react';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import global from 'zero-element/lib/config/global';
import { DatePicker } from 'antd';
import moment from 'moment';
const {
  WeekPicker,
  MonthPicker,
  RangePicker
} = DatePicker;
const componentMap = {
  'date': DatePicker,
  'week': WeekPicker,
  'month': MonthPicker,
  'range': RangePicker
};
const formatMap = {
  'date': 'YYYY-MM-DD',
  'week': 'YYYY-W',
  'month': 'YYYY-MM',
  'range': 'YYYY-MM-DD'
};

function date(componentName) {
  const Match = componentMap[componentName];
  return function DateConstructor(props) {
    const {
      dateFormat = {}
    } = global;
    const {
      value,
      options = {},
      onChange,
      props: propsOpt,
      formdata,
      handle,
      // ...restProps
      defaultValue
    } = props;
    const {
      nowTime = false,
      format = dateFormat[componentName] || formatMap[componentName],
      startDate,
      endDate
    } = options;
    const {
      onExpect,
      onSaveOtherValue
    } = handle;
    let val = value || defaultValue;

    if (componentName === 'range' && startDate && endDate) {
      val = [formdata[startDate], formdata[endDate]];
    }

    const dateProps = {
      showToday: true,
      allowClear: false,
      ...propsOpt,
      // ...restProps,
      value: formatDate(val, format),
      format,
      onChange: handleChange
    };

    function handleChange(moments, dateString) {
      if (componentName === 'range' && startDate && endDate && onSaveOtherValue) {
        onSaveOtherValue({
          [startDate]: dateString[0],
          [endDate]: dateString[1]
        });
        onChange(dateString[0]);
      } else {
        onChange(dateString);
      }
    }

    useDidMount(_ => {
      if (!value && nowTime) {
        if (componentName === 'range') {
          onChange([moment().subtract(7, 'days').format(format), moment().format(format)]);
        } else {
          onChange(moment().format(format));
        }
      }

      if (componentName === 'range' && startDate && endDate) {
        onExpect([startDate, endDate]);
      }
    });
    return /*#__PURE__*/React.createElement(Match, dateProps);
  };
}

function formatDate(value, format) {
  if (Array.isArray(value)) {
    return [formatDate(value[0], format), formatDate(value[1], format)];
  }

  return value ? moment(new Date(value), format) : undefined;
}

export default date;