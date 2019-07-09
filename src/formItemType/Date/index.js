import React from 'react';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { DatePicker } from 'antd';
import moment from 'moment';

const { WeekPicker, MonthPicker, RangePicker } = DatePicker;
const componentMap = {
  'date': DatePicker,
  'week': WeekPicker,
  'month': MonthPicker,
  'range': RangePicker,
};
const formatMap = {
  'date': 'YYYY-MM-DD',
  'week': 'YYYY-W',
  'month': 'YYYY-MM',
  'range': 'YYYY-MM-DD',
}

function date(componentName) {
  const Match = componentMap[componentName];
  return function DateConstructor(props) {
    const { value, options = {}, onChange } = props;
    const { nowTime = true, format = formatMap[componentName] } = options;

    const dateProps = {
      showToday: true,
      allowClear: false,
      ...restProps,
      value,
      format,
      onChange: handleChange,
    };

    function handleChange(moment, dateString) {
      onChange(dateString);
    }

    useDidMount(_ => {
      if (!value && nowTime) {
        if (componentName === 'range') {
          onChange([
            moment().subtract(7, 'days').format(format),
            moment().format(format)
          ]);
        } else {
          onChange(moment().format(format));
        }
      }
    });

    return <Match {...dateProps} />;
  }
}

export default date;