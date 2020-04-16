"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/date-picker/style/css");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

var _react = _interopRequireDefault(require("react"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _moment = _interopRequireDefault(require("moment"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
        onChange = props.onChange,
        propsOpt = props.props;
    var _options$nowTime = options.nowTime,
        nowTime = _options$nowTime === void 0 ? false : _options$nowTime,
        _options$format = options.format,
        format = _options$format === void 0 ? formatMap[componentName] : _options$format;

    var dateProps = _objectSpread({
      showToday: true,
      allowClear: false
    }, propsOpt, {
      // ...restProps,
      value: formatDate(value, format),
      format: format,
      onChange: handleChange
    });

    function handleChange(moment, dateString) {
      onChange(dateString);
    }

    (0, _lifeCycle.useDidMount)(function (_) {
      if (!value && nowTime) {
        if (componentName === 'range') {
          onChange([(0, _moment["default"])().subtract(7, 'days').format(format), (0, _moment["default"])().format(format)]);
        } else {
          onChange((0, _moment["default"])().format(format));
        }
      }
    });
    return /*#__PURE__*/_react["default"].createElement(Match, dateProps);
  };
}

function formatDate(value, format) {
  if (Array.isArray(value)) {
    return [formatDate(value[0], format), formatDate(value[1], format)];
  }

  return value ? (0, _moment["default"])(value || new Date(), format) : undefined;
}

var _default = date;
exports["default"] = _default;