"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/date-picker/style/css");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

var _react = _interopRequireDefault(require("react"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _moment = _interopRequireDefault(require("moment"));

var WeekPicker = _datePicker["default"].WeekPicker,
    MonthPicker = _datePicker["default"].MonthPicker,
    RangePicker = _datePicker["default"].RangePicker;
var componentMap = {
  'date': _datePicker["default"],
  'week': WeekPicker,
  'month': MonthPicker,
  'range': RangePicker
};
var formatMap = {
  'date': 'YYYY-MM-DD',
  'week': 'YYYY-W',
  'month': 'YYYY-MM',
  'range': 'YYYY-MM-DD'
};

function date(componentName) {
  var Match = componentMap[componentName];
  return function DateConstructor(props) {
    var value = props.value,
        _props$options = props.options,
        options = _props$options === void 0 ? {} : _props$options,
        onChange = props.onChange;
    var _options$nowTime = options.nowTime,
        nowTime = _options$nowTime === void 0 ? true : _options$nowTime,
        _options$format = options.format,
        format = _options$format === void 0 ? formatMap[componentName] : _options$format;
    var dateProps = {
      showToday: true,
      allowClear: false,
      // ...restProps,
      value: value ? (0, _moment["default"])(value || new Date(), format) : undefined,
      format: format,
      onChange: handleChange
    };

    function handleChange(moment, dateString) {
      onChange(dateString);
    }

    (0, _lifeCycle.useWillUnmount)(function (_) {
      if (!value && nowTime) {
        if (componentName === 'range') {
          onChange([(0, _moment["default"])().subtract(7, 'days').format(format), (0, _moment["default"])().format(format)]);
        } else {
          onChange((0, _moment["default"])().format(format));
        }
      }
    });
    return _react["default"].createElement(Match, dateProps);
  };
}

var _default = date;
exports["default"] = _default;