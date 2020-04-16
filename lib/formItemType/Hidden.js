"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _react = _interopRequireDefault(require("react"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

function _default(props) {
  var name = props.name,
      _props$options = props.options,
      options = _props$options === void 0 ? {} : _props$options,
      _props$handle = props.handle,
      handle = _props$handle === void 0 ? {} : _props$handle;
  var map = options.map;
  var onFormatValue = handle.onFormatValue;
  (0, _lifeCycle.useWillMount)(function (_) {
    if (map && onFormatValue) {
      onFormatValue(name, 'map', map);
    }
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      width: 1,
      height: 21
    }
  });
}