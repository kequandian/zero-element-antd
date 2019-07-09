"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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
    var dateProps = (0, _objectSpread2["default"])({
      showToday: true,
      allowClear: false
    }, restProps, {
      value: value,
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
    return _react["default"].createElement(Match, dateProps);
  };
}

var _default = date; // export default {
//   date: date('date'),
//   week: date('week'),
//   month: date('month'),
//   range: date('range'),
// }
// export default (componentName) => {
//   const Match = componentMap[componentName];
//   return class DateWrapped extends Component {
//     constructor(props) {
//       super(props);
//       const { value, options = {} } = props;
//       const { nowTime = true, format = formatMap[componentName] } = options;
//       this.state = {
//         originalValue: value,
//         value: initTime({
//           value,
//           nowTime,
//           componentName,
//           format,
//         }),
//       }
//     }
//     static getDerivedStateFromProps(nextProps, prevState) {
//       if (prevState.originalValue !== nextProps.value) {
//         const { value, options = {} } = nextProps;
//         const { nowTime = true, format = formatMap[componentName] } = options;
//         return {
//           originalValue: value,
//           value: initTime({
//             value,
//             nowTime,
//             componentName,
//             format,
//           }),
//         };
//       }
//       return null;
//     }
//     componentDidMount() {
//       const { originalValue, value } = this.state;
//       // 初始值为空且 nowTime !== false 的情况下，保存当前时间到 model
//       if (!originalValue && value) {
//         const { onChange, options = {} } = this.props;
//         const { format = formatMap[componentName] } = options;
//         if (componentName === 'range') {
//           onChange(value.map(item => item.format(format)));
//         } else {
//           onChange(value.format(format));
//         }
//       }
//     }
//     onChange = (moment, dateString) => {
//       const { onChange, options = {} } = this.props;
//       if (onChange) {
//         onChange(dateString);
//       }
//     }
//     render() {
//       const { options = {}, onBlur, ...restProps } = this.props;
//       const { format = formatMap[componentName] } = options;
//       const { value } = this.state;
//       const props = {
//         showToday: true,
//         ...restProps,
//         value,
//         format,
//         allowClear: false,
//         onChange: this.onChange,
//       };
//       return <Match {...props} />;
//     }
//   };
// }
// function initTime({ value, nowTime, componentName, format }) {
//   if (value instanceof moment) {
//     return value;
//   }
//   if (Array.isArray(value)) {
//     if (value[0] instanceof moment) {
//       return value;
//     } else {
//       return [moment(value[0], format), moment(value[1], format)];
//     }
//   }
//   if (value) {
//     return moment(value);
//   } else {
//     return nowTime ?
//       componentName === 'range'
//         ? [moment().format(format), moment().format(format)]
//         : moment().format(format)
//       : undefined;
//   }
// }

exports["default"] = _default;